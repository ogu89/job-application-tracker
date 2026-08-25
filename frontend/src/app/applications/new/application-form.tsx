"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  createApplication,
  type CreateApplicationState,
} from "./actions";

const statusOptions = [
  { value: "INTERESTED", label: "Interested" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "APPLIED", label: "Applied" },
  { value: "SCREENING", label: "Screening" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "OFFER", label: "Offer" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
] as const;

type FormValues = {
  companyName: string;
  roleTitle: string;
  jobUrl: string;
  recruiterName: string;
  status: (typeof statusOptions)[number]["value"];
  notes: string;
};

const initialValues: FormValues = {
  companyName: "",
  roleTitle: "",
  jobUrl: "",
  recruiterName: "",
  status: "INTERESTED",
  notes: "",
};

const initialActionState: CreateApplicationState = {
  error: null,
};

const fieldStyles =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function ApplicationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [actionState, formAction, isPending] = useActionState(
    createApplication,
    initialActionState,
  );

  function updateField<Name extends keyof FormValues>(
    name: Name,
    value: FormValues[Name],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Company name <span className="text-rose-600">*</span>
          <input
            autoComplete="organization"
            className={fieldStyles}
            name="companyName"
            onChange={(event) =>
              updateField("companyName", event.target.value)
            }
            placeholder="Acme Inc."
            required
            type="text"
            value={values.companyName}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Role title <span className="text-rose-600">*</span>
          <input
            autoComplete="organization-title"
            className={fieldStyles}
            name="roleTitle"
            onChange={(event) => updateField("roleTitle", event.target.value)}
            placeholder="Software Engineer"
            required
            type="text"
            value={values.roleTitle}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Job URL
          <input
            className={fieldStyles}
            name="jobUrl"
            onChange={(event) => updateField("jobUrl", event.target.value)}
            placeholder="https://example.com/jobs/123"
            type="url"
            value={values.jobUrl}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Recruiter name
          <input
            autoComplete="name"
            className={fieldStyles}
            name="recruiterName"
            onChange={(event) =>
              updateField("recruiterName", event.target.value)
            }
            placeholder="Jordan Lee"
            type="text"
            value={values.recruiterName}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
          Status
          <select
            className={fieldStyles}
            name="status"
            onChange={(event) =>
              updateField("status", event.target.value as FormValues["status"])
            }
            value={values.status}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
          Notes
          <textarea
            className={`${fieldStyles} min-h-32 resize-y`}
            name="notes"
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Add interview details, follow-up reminders, or other notes."
            value={values.notes}
          />
        </label>
      </div>

      {actionState.error && (
        <div
          aria-live="polite"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {actionState.error}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          href="/applications"
        >
          Cancel
        </Link>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Creating…" : "Create application"}
        </button>
      </div>
    </form>
  );
}
