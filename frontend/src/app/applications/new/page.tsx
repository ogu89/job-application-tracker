import type { Metadata } from "next";
import { ApplicationForm } from "./application-form";

export const metadata: Metadata = {
  title: "New application",
  description: "Add a job application to your tracker.",
};

export default function NewApplicationPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Job tracker
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            New application
          </h1>
          <p className="mt-2 text-slate-600">
            Add a role and keep its progress in one place.
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ApplicationForm />
        </section>
      </div>
    </main>
  );
}
