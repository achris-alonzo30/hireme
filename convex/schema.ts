import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import {
    Skills,
    Profile,
    Projects,
    Education,
    WorkExperience,
    ApplicationStatus
} from "./types";


export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string()
    }).index("by_token", ["tokenIdentifier"]),

    resume: defineTable({
        userId: v.id("users"),
        documentName: v.string(),
        profile: v.optional(Profile),
        projects: v.optional(Projects),
        skills: v.optional(Skills),
        workExperience: v.optional(WorkExperience),
        education: v.optional(Education),
        score: v.optional(v.string()),
    }).index("by_userId", ["userId"]),

    // Update this to add the resume was used to apply for the application
    applications: defineTable({
        userId: v.id("users"),
        company: v.string(),
        jobLink: v.string(),
        jobTitle: v.string(),
        location: v.string(),
        dateApplied: v.string(),
        status: ApplicationStatus,
        notes: v.optional(v.string()),
        salary: v.optional(v.string()),
        recruiterInfo: v.optional(v.string()),
    }).index("by_userId", ["userId"]),

    // Update this to add the resume was used to analyzed
    results: defineTable({
        userId: v.id("users"),
        resumeId: v.id("resume"),
        score: v.optional(v.string()),
        jobDescriptionSummary: v.object({
            jobPosition: v.string(),
            companyName: v.string(),
            location: v.string(),
            employmentType: v.union(v.literal("Full-Time"), v.literal("Part-Time"), v.literal("Hybrid")),
            responsibilities: v.array(v.string()),
            requiredSkills: v.array(v.string()),
            preferredQualification: v.array(v.string()),
            experienceLevel: v.string(),
            educationalRequirements: v.string(),
            salaryRange: v.string(),
            benefits: v.array(v.string())
        }),
        extractedKeywords: v.object ({
            highImportance: v.array(v.string()),
            mediumImportance: v.array(v.string()),
            lowImportance: v.array(v.string()),
        }),
        userFeedback: v.object({
            missingKeywords: v.array(v.string()),
            suggestions: v.array(v.string())
        })
    }).index("by_user", ["userId"])
      .index("by_resumeId", ["resumeId"])
      .index("by_userId_resume_id", ["userId", "resumeId"])
})