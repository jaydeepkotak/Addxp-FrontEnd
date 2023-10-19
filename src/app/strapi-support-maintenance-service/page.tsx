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
import FAQS from "@/Components/FAQ/FAQS";
import OurServices from "@/Components/Services/OurServices";
import SupportPlans from "./Components/SupportPlans";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OurWorkflow from "../strapi-cms-development-service/Components/OurWorkflow";

export default function Strapisupportmaintenanceservice() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("strapiSupportAndMaintenance")} />
      <Banner
        name={pathname}
        query={BANNER_QUERY("strapiSupportAndMaintenance")}
      />
      <StrapiTitles
        name={pathname}
        query={STRAPI_SUBTITLE_QUERY("strapiSupportAndMaintenance")}
      />
      <OurServices
        name={pathname}
        query={OUR_SERVICES_QUERY("strapiSupportAndMaintenance")}
      />
      <ExpertResource
        name={pathname}
        query={STRAPI_EXPERT_RESOURCES("strapiSupportAndMaintenance")}
      />
      <CTA name={pathname} query={CTA_QUERY("strapiSupportAndMaintenance")} />
      <OurWorkflow
        name={pathname}
        query={WORKFLOW("strapiSupportAndMaintenance")}
      />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("strapiSupportAndMaintenance")}
      />
      <SupportPlans />
      <Email
        name={pathname}
        query={FORM_TITLE_QUERY("strapiSupportAndMaintenance")}
      />
      <FAQS name={pathname} query={FAQ("strapiSupportAndMaintenance")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("strapiSupportAndMaintenance")}
      />
      <LatestNews
        name={pathname}
        query={LATEST_NEWS("strapiSupportAndMaintenance")}
      />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("strapiSupportAndMaintenance")}
      />
    </>
  );
}
