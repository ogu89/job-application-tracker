"use client";

import { useActionState, useState } from "react";
import {
  updateApplication,
  type UpdateApplicationState,
} from "./actions";
import {
  applicationStatuses,
  type Application,
  type ApplicationStatus,
} from "./types";

type FormValues = {
  companyName: string;
  roleTitle: string;
  jobUrl: string;
  recruiterName: string;
  status: ApplicationStatus;
  notes: string;
  appliedAt: string;
};

const initialActionState: UpdateApplicationState = {
  error: null,
  success: null,
};

const fieldStyles =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function toDateInputValue(appliedAt: string | null) {
  if (!appliedAt) {
    return "";
  }

  const date = new Date(appliedAt);

  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function ApplicationEditForm({
  application,
}: {
  application: Application;
}) {
  const [values, setValues] = useState<FormValues>(() => ({
    companyName: application.companyName,
    roleTitle: application.roleTitle,
    jobUrl: application.jobUrl ?? "",
    recruiterName: application.recruiterName ?? "",
    status: application.status,
    notes: application.notes ?? "",
    appliedAt: toDateInputValue(application.appliedAt),
  }));
  const [actionState, formAction, isPending] = useActionState(
    updateApplication,
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
      <input name="id" type="hidden" value={application.id} />

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
            type="text"
            value={values.recruiterName}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Status
          <select
            className={fieldStyles}
            name="status"
            onChange={(event) =>
              updateField("status", event.target.value as ApplicationStatus)
            }
            value={values.status}
          >
            {applicationStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Applied date
          <input
            className={fieldStyles}
            name="appliedAt"
            onChange={(event) => updateField("appliedAt", event.target.value)}
            type="date"
            value={values.appliedAt}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
          Notes
          <textarea
            className={`${fieldStyles} min-h-36 resize-y`}
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

      {actionState.success && (
        <div
          aria-live="polite"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          role="status"
        >
          {actionState.success}
        </div>
      )}

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
