"use client";
import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  DEVELOPMENT_PROCESS,
  FAQ,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  SERVICES_DETILS_QUERY,
  SERVICE_CARD,
  STRAPI_EXPERT_RESOURCES,
  STRAPI_RELATED_SERVICES,
  STRAPI_SUBTITLE_QUERY,
} from "@/Configurations/CommonQuery";

import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import ExpertResource from "@/Components/Services/ExpertResource";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import DevelopmentProcess from "@/Components/Services/DevelopmentProcess";
import StrapiServiceCard from "@/Components/Services/StrapiServiceCard";
import StrapiVersions from "./Components/StrapiVersions";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

export default function Strapiupgradeservice() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("strapiUpgrade")} />

      <Banner name={pathname} query={BANNER_QUERY("strapiUpgrade")} />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("strapiUpgrade")}
      />
      <StrapiServiceCard
        name={pathname}
        query={SERVICE_CARD("strapiUpgrade")}
      />
      <DevelopmentProcess
        name={pathname}
        query={DEVELOPMENT_PROCESS("strapiUpgrade")}
      />
      <ExpertResource
        name={pathname}
        query={STRAPI_EXPERT_RESOURCES("strapiUpgrade")}
      />
      <StrapiVersions />
      <CTA name={pathname} query={CTA_QUERY("strapiUpgrade")} />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("strapiUpgrade")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("strapiUpgrade")} />
      <FAQS name={pathname} query={FAQ("strapiUpgrade")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("strapiUpgrade")}
      />

      <LatestNews name={pathname} query={LATEST_NEWS("strapiUpgrade")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("strapiUpgrade")}
      />
    </>
  );
}
