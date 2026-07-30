-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('INTERESTED', 'CONTACTED', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "jobUrl" TEXT,
    "recruiterName" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'INTERESTED',
    "notes" TEXT,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);
