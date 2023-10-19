"use client";
import { usePathname } from "next/navigation";
import ServiceTitle from "../../Components/Services/ServiceTitle";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
  LATEST_NEWS,
  OUR_SERVICES_QUERY,
  SERVICES_DETILS_QUERY,
  SERVICE_EXP_QUERY,
  TITIE_QUERY,
} from "@/Configurations/CommonQuery";
import OurServices from "@/Components/Services/OurServices";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function KenticoCMS() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("kenticoDevelopmentService")} />
      <Banner
        name={pathname}
        query={BANNER_QUERY("kenticoDevelopmentService")}
      />
      <ServiceTitle
        name={pathname}
        query={TITIE_QUERY("kenticoDevelopmentService")}
      />
      <OurServices
        name={pathname}
        query={OUR_SERVICES_QUERY("kenticoDevelopmentService")}
      />
      <CTA name={pathname} query={CTA_QUERY("kenticoDevelopmentService")} />
      <ServiceExperience
        name={pathname}
        query={SERVICE_EXP_QUERY("kenticoDevelopmentService")}
      />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("kenticoDevelopmentService")}
      />
      <FAQS name={pathname} query={FAQ("kenticoDevelopmentService")} />
      <LatestNews
        name={pathname}
        query={LATEST_NEWS("kenticoDevelopmentService")}
      />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("kenticoDevelopmentService")}
      />
    </>
  );
}
