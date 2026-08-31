"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export type CreateApplicationState = {
  error: string | null;
};

function readField(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

async function getResponseError(response: Response) {
  try {
    const body: unknown = await response.json();

    if (typeof body === "object" && body !== null && "message" in body) {
      const message = body.message;

      if (Array.isArray(message)) {
        return message.filter((item) => typeof item === "string").join(" ");
      }

      if (typeof message === "string") {
        return message;
      }
    }
  } catch {
    // Fall through to the HTTP status message when the body is not JSON.
  }

  return `The applications API returned status ${response.status}.`;
}

export async function createApplication(
  _previousState: CreateApplicationState,
  formData: FormData,
): Promise<CreateApplicationState> {
  const companyName = readField(formData, "companyName");
  const roleTitle = readField(formData, "roleTitle");
  const jobUrl = readField(formData, "jobUrl");
  const recruiterName = readField(formData, "recruiterName");
  const status = readField(formData, "status");
  const notes = readField(formData, "notes");

  if (!companyName || !roleTitle) {
    return {
      error: "Company name and role title are required.",
    };
  }

  const payload = {
    companyName,
    roleTitle,
    status,
    ...(jobUrl && { jobUrl }),
    ...(recruiterName && { recruiterName }),
    ...(notes && { notes }),
  };

  let response: Response;

  try {
    response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      error:
        "The applications API could not be reached. Make sure the NestJS backend is running on port 3001.",
    };
  }

  if (!response.ok) {
    return {
      error: await getResponseError(response),
    };
  }

  revalidatePath("/applications");
  redirect("/applications");
}
