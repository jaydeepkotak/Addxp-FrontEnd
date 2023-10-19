"use client";
import { usePathname } from "next/navigation";
import Banner from "@/Components/Banner/Banner";
import Locations from "./Components/Locations";
import WeekDays from "./Components/WeekDays";
import {
  BANNER_NAV_QUERY,
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
} from "@/Configurations/CommonQuery";
import BannerNav from "@/Components/Banner/BannerNav";
import ContactForm from "./Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function ContactUs() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("contactUs")} />
      <Banner name={pathname} query={BANNER_QUERY("contactUs")} />
      <BannerNav name={pathname} query={BANNER_NAV_QUERY("contactUs")} />
      <WeekDays />
      <Locations />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("contactUs")}
      />
    </>
  );
}
