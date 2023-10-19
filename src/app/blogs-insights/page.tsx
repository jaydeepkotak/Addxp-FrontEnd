"use client";

import TabMenu from "./Components/TabMenu";

import { usePathname } from "next/navigation";
import Banner from "@/Components/Banner/Banner";
import { BANNER_QUERY } from "@/Configurations/CommonQuery";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

export default function BlogsInsights() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("blogsInsight")} />
      <div className="blog-listing">
        <Banner name={pathname} query={BANNER_QUERY("blogsInsight")} />
        <TabMenu />
      </div>
    </>
  );
}
