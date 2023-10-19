"use client";
import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  SERVICES_DETILS_QUERY,
  SERVICE_CARD,
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
import FAQS from "@/Components/FAQ/FAQS";
import StrapiServiceCard from "@/Components/Services/StrapiServiceCard";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OurWorkflow from "../strapi-cms-development-service/Components/OurWorkflow";

export default function Strapimigrationservice() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("strapiMig")} />
      <Banner name={pathname} query={BANNER_QUERY("strapiMig")} />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("strapiMig")}
      />
      <StrapiServiceCard name={pathname} query={SERVICE_CARD("strapiMig")} />
      <ExpertResource
        name={pathname}
        query={STRAPI_EXPERT_RESOURCES("strapiMig")}
      />
      <CTA name={pathname} query={CTA_QUERY("strapiMig")} />

      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("strapiMig")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("strapiMig")} />
      <FAQS name={pathname} query={FAQ("strapiMig")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("strapiMig")}
      />

      <LatestNews name={pathname} query={LATEST_NEWS("strapiMig")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("strapiMig")}
      />
    </>
  );
}
