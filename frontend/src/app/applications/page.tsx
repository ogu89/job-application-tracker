import type { Metadata } from "next";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type ApplicationStatus =
  | "INTERESTED"
  | "CONTACTED"
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN";

type Application = {
  id: string;
  companyName: string;
  roleTitle: string;
  status: ApplicationStatus;
  appliedAt: string | null;
};

type ApplicationsResult =
  | { applications: Application[]; error: null }
  | { applications: null; error: string };

const statusStyles: Record<ApplicationStatus, string> = {
  INTERESTED: "bg-slate-100 text-slate-700",
  CONTACTED: "bg-cyan-100 text-cyan-700",
  APPLIED: "bg-blue-100 text-blue-700",
  SCREENING: "bg-violet-100 text-violet-700",
  INTERVIEW: "bg-amber-100 text-amber-800",
  OFFER: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
  WITHDRAWN: "bg-zinc-100 text-zinc-700",
};

export const metadata: Metadata = {
  title: "Applications",
  description: "View your job applications.",
};

async function getApplications(): Promise<ApplicationsResult> {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        applications: null,
        error: `The applications API returned status ${response.status}.`,
      };
    }

    const applications: unknown = await response.json();

    if (!Array.isArray(applications)) {
      return {
        applications: null,
        error: "The applications API returned an unexpected response.",
      };
    }

    return { applications: applications as Application[], error: null };
  } catch {
    return {
      applications: null,
      error: "The applications API could not be reached.",
    };
  }
}

function formatStatus(status: ApplicationStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatAppliedAt(appliedAt: string | null) {
  if (!appliedAt) {
    return "Not set";
  }

  const date = new Date(appliedAt);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export default async function ApplicationsPage() {
  const result = await getApplications();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Job tracker
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Applications
            </h1>
            <p className="mt-2 text-slate-600">
              Review the roles you are currently tracking.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
            href="/applications/new"
          >
            New Application
          </Link>
        </header>

        {result.error ? (
          <section
            aria-live="polite"
            className="rounded-xl border border-rose-200 bg-white p-6 shadow-sm"
          >
            <h2 className="font-semibold text-rose-700">
              Unable to load applications
            </h2>
            <p className="mt-2 text-sm text-slate-600">{result.error}</p>
            <p className="mt-1 text-sm text-slate-600">
              Make sure the NestJS backend is running on port 3001, then refresh
              this page.
            </p>
            <Link
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 sm:w-auto"
              href="/applications"
            >
              Try again
            </Link>
          </section>
        ) : result.applications?.length === 0 ? (
          <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <h2 className="font-semibold text-slate-900">
              No applications yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add your first role to start tracking its progress.
            </p>
            <Link
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
              href="/applications/new"
            >
              Add your first application
            </Link>
          </section>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-2xl border-collapse text-left">
                <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600">
                  <tr>
                    <th className="px-6 py-4 font-semibold" scope="col">
                      Company
                    </th>
                    <th className="px-6 py-4 font-semibold" scope="col">
                      Role
                    </th>
                    <th className="px-6 py-4 font-semibold" scope="col">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold" scope="col">
                      Applied
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {result.applications?.map((application) => (
                    <tr
                      className="transition-colors hover:bg-slate-50"
                      key={application.id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-semibold">
                        <Link
                          aria-label={`View ${application.companyName} application`}
                          className="text-blue-700 underline-offset-4 hover:text-blue-800 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          href={`/applications/${application.id}`}
                        >
                          {application.companyName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {application.roleTitle}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
                        >
                          {formatStatus(application.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {formatAppliedAt(application.appliedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
