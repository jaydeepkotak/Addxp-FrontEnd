"use client";
import { usePathname } from "next/navigation";
import BrandValues from "./Components/BrandValues";
import DirectorMessage from "./Components/DirectorMessage";
import Misionvision from "./Components/Misionvision";
import Innovations from "./Components/Innovations";
import Empowerments from "./Components/Empowerments";
import CTA from "@/Components/CTA/CTA";
import {
  BANNER_NAV_QUERY,
  BANNER_QUERY,
  CTA_QUERY,
} from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import BannerNav from "@/Components/Banner/BannerNav";
import { INNOVATIONS } from "./Query/AboutUsQuery";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function AboutUs() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("aboutUs")} />
      <Banner name={pathname} query={BANNER_QUERY("aboutUs")} />
      <BannerNav name={pathname} query={BANNER_NAV_QUERY("aboutUs")} />
      <DirectorMessage />
      <Empowerments />
      <Misionvision />
      <CTA name={pathname} query={CTA_QUERY("aboutUs")} />
      <BrandValues />
      <Innovations name={pathname} query={INNOVATIONS("aboutUs")} />
    </>
  );
}
