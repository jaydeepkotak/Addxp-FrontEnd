"use client";
import { usePathname } from "next/navigation";
import Banner from "@/Components/Banner/Banner";
import {
  BANNER_QUERY,
  BRAND_TAGLINE,
  KEY_TAGLINE,
  STRAPI_SUBTITLE_QUERY,
} from "@/Configurations/CommonQuery";
import Tagline from "./Components/Tagline";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import Keytagline from "./Components/Keytagline";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

export default function Brandguideline() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("brandGuideline")} />
      <Banner name={pathname} query={BANNER_QUERY("brandGuideline")} />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("brandGuideline")}
      />
      <Keytagline name={pathname} query={KEY_TAGLINE("brandGuideline")} />
      <Tagline name={pathname} query={BRAND_TAGLINE("brand_taglines")} />
    </>
  );
}
