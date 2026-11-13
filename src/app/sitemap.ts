import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "",
  "/about",
  "/staffing",
  "/staffing/permanent-recruitment",
  "/staffing/volume-staffing",
  "/staffing/compliance",
  "/staffing/bgv",
  "/industries",
  "/workforce-management",
  "/payroll",
  "/employers",
  "/candidates",
  "/register",
  "/jobs",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/jobs" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/contact" ? 0.8 : 0.6,
  }));
}
