import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicationEditForm } from "./application-edit-form";
import { isApplication, type Application } from "./types";

const APPLICATIONS_API_URL = "http://localhost:3001/applications";

type ApplicationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Application details",
  description: "View and update a job application.",
};

async function getApplication(id: string): Promise<Application> {
  let response: Response;

  try {
    response = await fetch(
      `${APPLICATIONS_API_URL}/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );
  } catch {
    throw new Error("The applications API could not be reached.");
  }

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(
      `The applications API returned status ${response.status}.`,
    );
  }

  const application: unknown = await response.json();

  if (!isApplication(application)) {
    throw new Error("The applications API returned an unexpected response.");
  }

  return application;
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = await getApplication(id);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          className="mb-6 inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline-offset-4 hover:text-blue-800 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/applications"
        >
          ← Back to applications
        </Link>

        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Job tracker
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {application.companyName}
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            {application.roleTitle}
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ApplicationEditForm application={application} />
        </section>
      </div>
    </main>
  );
}
