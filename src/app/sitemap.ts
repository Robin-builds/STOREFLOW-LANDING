import type { MetadataRoute } from "next";
import { URLS } from "@/content/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: URLS.site, changeFrequency: "monthly", priority: 1 }];
}
