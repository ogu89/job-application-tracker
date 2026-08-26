export const applicationStatuses = [
  { value: "INTERESTED", label: "Interested" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "APPLIED", label: "Applied" },
  { value: "SCREENING", label: "Screening" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "OFFER", label: "Offer" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
] as const;

export type ApplicationStatus =
  (typeof applicationStatuses)[number]["value"];

export type Application = {
  id: string;
  companyName: string;
  roleTitle: string;
  jobUrl: string | null;
  recruiterName: string | null;
  status: ApplicationStatus;
  notes: string | null;
  appliedAt: string | null;
};

function isNullableString(value: unknown): value is string | null {
  return typeof value === "string" || value === null;
}

export function isApplicationStatus(
  value: unknown,
): value is ApplicationStatus {
  return applicationStatuses.some((status) => status.value === value);
}

export function isApplication(value: unknown): value is Application {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const application = value as Record<string, unknown>;

  return (
    typeof application.id === "string" &&
    typeof application.companyName === "string" &&
    typeof application.roleTitle === "string" &&
    isNullableString(application.jobUrl) &&
    isNullableString(application.recruiterName) &&
    isApplicationStatus(application.status) &&
    isNullableString(application.notes) &&
    isNullableString(application.appliedAt)
  );
}
