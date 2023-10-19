"use client";
import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  DEVELOPMENT_PROCESS,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  OUR_SERVICES_QUERY,
  SERVICES_DETILS_QUERY,
  STRAPI_EXPERT_RESOURCES,
  STRAPI_RELATED_SERVICES,
  STRAPI_SUBTITLE_QUERY,
  WORKFLOW,
} from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import ExpertResource from "@/Components/Services/ExpertResource";
import LatestNews from "@/Components/LatestNews/LatestNews";
import DevelopmentProcess from "@/Components/Services/DevelopmentProcess";
import OurServices from "@/Components/Services/OurServices";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import OurWorkflow from "./Components/OurWorkflow";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function Strapicmsdevelopmentservice() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("strapiDevelopment")} />
      <Banner name={pathname} query={BANNER_QUERY("strapiDevelopment")} />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("strapiDevelopment")}
      />
      <OurServices
        name={pathname}
        query={OUR_SERVICES_QUERY("strapiDevelopment")}
      />
      <DevelopmentProcess
        name={pathname}
        query={DEVELOPMENT_PROCESS("strapiDevelopment")}
      />
      <ExpertResource
        name={pathname}
        query={STRAPI_EXPERT_RESOURCES("strapiDevelopment")}
      />
      <CTA name={pathname} query={CTA_QUERY("strapiDevelopment")} />
      <OurWorkflow name={pathname} query={WORKFLOW("strapiDevelopment")} />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("strapiDevelopment")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("strapiDevelopment")} />

      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("strapiDevelopment")}
      />
      <LatestNews name={pathname} query={LATEST_NEWS("strapiDevelopment")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("strapiDevelopment")}
      />
    </>
  );
}
