"use client";
import { usePathname } from "next/navigation";
import Banner from "@/Components/Banner/Banner";
import CareerComponent from "./Components/CareerComponent";
import Experience from "./Components/Experience";
import {
  BANNER_NAV_QUERY,
  BANNER_QUERY,
  CAREER_POSITION,
  IMAGE_GALLAEY,
} from "@/Configurations/CommonQuery";
import BannerNav from "@/Components/Banner/BannerNav";
import ActivityComponent from "./Components/ActivityComponent";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function Career() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("career")} />
      <Banner name={pathname} query={BANNER_QUERY("career")} />
      <BannerNav name={pathname} query={BANNER_NAV_QUERY("career")} />
      <Experience />
      <CareerComponent name={pathname} query={CAREER_POSITION("career")} />
      <ActivityComponent name={pathname} query={IMAGE_GALLAEY("career")} />
    </>
  );
}
