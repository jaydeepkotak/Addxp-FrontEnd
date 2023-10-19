"use client";
import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
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
import StrapiServiceCard from "@/Components/Services/StrapiServiceCard";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

export default function Strapiuidesignservice() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("strapiUiUxDesign")} />

      <Banner name={pathname} query={BANNER_QUERY("strapiUiUxDesign")} />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("strapiUiUxDesign")}
      />
      <StrapiServiceCard
        name={pathname}
        query={SERVICE_CARD("strapiUiUxDesign")}
      />
      <ExpertResource
        name={pathname}
        query={STRAPI_EXPERT_RESOURCES("strapiUiUxDesign")}
      />
      <CTA name={pathname} query={CTA_QUERY("strapiUiUxDesign")} />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("strapiUiUxDesign")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("strapiUiUxDesign")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("strapiUiUxDesign")}
      />
      <LatestNews name={pathname} query={LATEST_NEWS("strapiUiUxDesign")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("strapiUiUxDesign")}
      />
    </>
  );
}
