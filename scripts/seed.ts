import "dotenv/config";
import { db } from "../src/db";
import { jobs } from "../src/db/schema";

const SAMPLE_JOBS = [
  {
    title: "Senior Operations Manager",
    company: "Workforce Engagement",
    location: "Bengaluru, India",
    industry: "Logistics & Supply Chain",
    employmentType: "Permanent",
    experience: "6–10 years",
    description:
      "Job Nexus HR is supporting a workforce engagement with a logistics operator that requires a senior operations manager to oversee on-ground workforce deployment, attendance and shift coverage across multiple sites.",
    responsibilities:
      "Manage daily operations across assigned sites\nCoordinate shift coverage, attendance and replacement loop\nLiaise with on-site supervisors and the JN account team\nHandle escalations, grievance and onboarding issues\nMaintain operational visibility through weekly reviews",
    requirements:
      "6+ years in operations or workforce management\nExperience handling 100+ workforce size\nStrong stakeholder management\nComfort with attendance, attrition and replacement cycles",
  },
  {
    title: "Customer Support Lead",
    company: "Engagement — Service Operations",
    location: "Gurugram, India",
    industry: "BPO / KPO",
    employmentType: "Permanent",
    experience: "4–8 years",
    description:
      "A hiring need from one of Job Nexus HR's clients in the customer support space — for a lead to manage voice support teams across shifts, with shared accountability for SLA and CSAT metrics.",
    responsibilities:
      "Lead a team of 25–40 customer support executives\nOwn shift scheduling, attendance and quality across the floor\nCoordinate with QA on call audits and escalations\nReport weekly to the client's operations lead and the JN account team",
    requirements:
      "4+ years in voice support leadership\nComfort with shift operations, attrition control, scheduling tools\nStrong written and verbal communication",
  },
  {
    title: "Warehouse Supervisor (Volume)",
    company: "Engagement — Volume Staffing",
    location: "Mumbai, India",
    industry: "Warehousing",
    employmentType: "Contract",
    experience: "3–6 years",
    description:
      "Volume staffing engagement supporting a warehousing operation. The supervisor would lead a floor team of 30–50 associates handling inbound, sorting and outbound activity.",
    responsibilities:
      "Supervise 30–50 floor associates across inbound / outbound\nRun daily huddle, attendance and shift handover\nCoordinate with the client's logistics team on throughput\nEscalate issues through the JN operations coordinator",
    requirements:
      "3+ years on a warehouse floor in a supervisory role\nComfort with high-volume, fast-paced environments\nBasic reporting on attendance and throughput",
  },
  {
    title: "HR Operations Coordinator",
    company: "Workforce Engagement",
    location: "Pune, India",
    industry: "Professional Services",
    employmentType: "Permanent",
    experience: "2–5 years",
    description:
      "An internal-style role supporting Job Nexus HR's own workforce engagements — handling documentation, on-boarding, attendance reconciliation and worker issue coordination under the account owner.",
    responsibilities:
      "Documentation and onboarding for new workforce batches\nAttendance input, reconciliation and reporting\nCoordinate with payroll on cycle inputs\nFollow up on escalations from on-site supervisors",
    requirements:
      "2+ years in HR operations or coordination\nBasic working knowledge of PF / ESI / payroll cycles\nStrong organisational and follow-through skills",
  },
];

async function seed() {
  for (const job of SAMPLE_JOBS) {
    await db.insert(jobs).values(job);
  }
  console.log(`Inserted ${SAMPLE_JOBS.length} jobs`);
}

seed().then(() => process.exit(0));
