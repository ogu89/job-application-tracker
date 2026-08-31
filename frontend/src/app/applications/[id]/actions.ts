"use server";

import { revalidatePath } from "next/cache";
import { isApplicationStatus } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export type UpdateApplicationState = {
  error: string | null;
  success: string | null;
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

export async function updateApplication(
  _previousState: UpdateApplicationState,
  formData: FormData,
): Promise<UpdateApplicationState> {
  const id = readField(formData, "id");
  const companyName = readField(formData, "companyName");
  const roleTitle = readField(formData, "roleTitle");
  const jobUrl = readField(formData, "jobUrl");
  const recruiterName = readField(formData, "recruiterName");
  const status = readField(formData, "status");
  const notes = readField(formData, "notes");
  const appliedAt = readField(formData, "appliedAt");

  if (!id) {
    return {
      error: "The application ID is missing.",
      success: null,
    };
  }

  if (!companyName || !roleTitle) {
    return {
      error: "Company name and role title are required.",
      success: null,
    };
  }

  if (!isApplicationStatus(status)) {
    return {
      error: "Choose a valid application status.",
      success: null,
    };
  }

  let appliedAtIso: string | undefined;

  if (appliedAt) {
    const appliedDate = new Date(`${appliedAt}T00:00:00.000Z`);

    if (Number.isNaN(appliedDate.getTime())) {
      return {
        error: "Enter a valid applied date.",
        success: null,
      };
    }

    appliedAtIso = appliedDate.toISOString();
  }

  const payload = {
    companyName,
    roleTitle,
    jobUrl: jobUrl || null,
    recruiterName: recruiterName || null,
    status,
    notes: notes || null,
    ...(appliedAtIso && { appliedAt: appliedAtIso }),
  };

  let response: Response;

  try {
    response = await fetch(`${API_URL}/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      error:
        "The applications API could not be reached. Make sure the NestJS backend is running on port 3001.",
      success: null,
    };
  }

  if (response.status === 404) {
    return {
      error: "This application no longer exists.",
      success: null,
    };
  }

  if (!response.ok) {
    return {
      error: await getResponseError(response),
      success: null,
    };
  }

  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);

  return {
    error: null,
    success: "Application saved successfully.",
  };
}
