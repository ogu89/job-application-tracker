import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { updateApplication } from "./actions";
import { ApplicationEditForm } from "./application-edit-form";
import type { Application } from "./types";

vi.mock("./actions", () => ({
  updateApplication: vi.fn(async () => ({
    error: null,
    success: "Application saved successfully.",
  })),
}));

const application: Application = {
  id: "application-1",
  companyName: "Northstar Labs",
  roleTitle: "Frontend Engineer",
  jobUrl: null,
  recruiterName: null,
  status: "INTERESTED",
  notes: null,
  appliedAt: null,
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ApplicationEditForm", () => {
  it("keeps the selected status after a successful update", async () => {
    render(<ApplicationEditForm application={application} />);

    const status = screen.getByLabelText("Status") as HTMLSelectElement;

    fireEvent.change(status, { target: { value: "INTERVIEW" } });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(updateApplication).toHaveBeenCalledOnce());
    expect(
      await screen.findByText("Application saved successfully."),
    ).toBeInTheDocument();
    expect(status).toHaveValue("INTERVIEW");
  });
});
