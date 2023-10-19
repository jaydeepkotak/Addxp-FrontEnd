"use client";
import { usePathname } from "next/navigation";
import { BANNER_QUERY } from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

export default function AboutUs() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("pressRelease")} />
      <Banner name={pathname} query={BANNER_QUERY("pressRelease")} />
    </>
  );
}
