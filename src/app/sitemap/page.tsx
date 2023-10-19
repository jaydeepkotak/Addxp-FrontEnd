"use client";
import { usePathname } from "next/navigation";
import Banner from "@/Components/Banner/Banner";
import Sitemap from "./Components/Sitemap";
import { BANNER_QUERY } from "@/Configurations/CommonQuery";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function Sitemaps() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("sitemap")} />
      <Banner name={pathname} query={BANNER_QUERY("sitemap")} />
      <Sitemap />
    </>
  );
}
