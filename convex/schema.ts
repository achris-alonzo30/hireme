import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import {
    Skills,
    Profile,
    Projects,
    Education,
    WorkExperience
} from "./resume-types";

const applicationStatus = v.union(
    v.literal("applied"),
    v.literal("interviewed"),
    v.literal("offered"),
    v.literal("rejected"),
)

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
        aiFeedback: v.optional(v.string()), // Change this to have a custom object
    }).index("by_userId", ["userId"]),

    jobTracker: defineTable({
        userId: v.id("users"),
        resumeId: v.id("resume"),
        company: v.string(),
        jobLink: v.string(),
        jobTitle: v.string(),
        location: v.string(),
        status: applicationStatus,
        notes: v.optional(v.string()),
        salary: v.optional(v.string()),
        contactInfo: v.optional(v.string()),
        applicationPlatform: v.optional(v.string()),
    }).index("by_userId", ["userId"])
      .index("by_resumeId", ["resumeId"])
      .index("by_userId_resumeId", ["userId", "resumeId"])
})