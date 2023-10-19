"use client";
import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
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
import GoStrapi from "./Components/GoStrapi";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import OurServices from "@/Components/Services/OurServices";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OurWorkflow from "../strapi-cms-development-service/Components/OurWorkflow";
import Calendly from "./Components/Calendly";

export default function Strapicmsconsultationservice() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("strapiConsultation")} />
      <Banner name={pathname} query={BANNER_QUERY("strapiConsultation")} />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("strapiConsultation")}
      />
      <GoStrapi />
      <OurServices
        name={pathname}
        query={OUR_SERVICES_QUERY("strapiConsultation")}
      />
      <ExpertResource
        name={pathname}
        query={STRAPI_EXPERT_RESOURCES("strapiConsultation")}
      />
      <CTA name={pathname} query={CTA_QUERY("strapiConsultation")} />
      <OurWorkflow name={pathname} query={WORKFLOW("strapiConsultation")} />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("strapiConsultation")}
      />
      <Calendly />
      <FAQS name={pathname} query={FAQ("strapiConsultation")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("strapiConsultation")}
      />

      <LatestNews name={pathname} query={LATEST_NEWS("strapiConsultation")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("strapiConsultation")}
      />
    </>
  );
}
