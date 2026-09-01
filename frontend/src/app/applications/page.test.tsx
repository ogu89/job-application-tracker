import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ApplicationsPage from "./page";

const mockApplications = [
  {
    id: "application-1",
    companyName: "Northstar Labs",
    roleTitle: "Frontend Engineer",
    status: "INTERVIEW",
    appliedAt: "2026-08-20T00:00:00.000Z",
  },
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ApplicationsPage", () => {
  it("renders an application returned by the API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockApplications), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(await ApplicationsPage());

    expect(screen.getByText("Northstar Labs")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
  });
});
