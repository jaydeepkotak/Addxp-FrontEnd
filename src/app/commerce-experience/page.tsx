"use client";
import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";
import {
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  SERVICEEXPERIENCEDETAILS,
  SERVICE_EXP_QUERY,
  SERVICE_PROCESS,
  STRAPI_RELATED_SERVICES,
  VERTICAL_SLIDER,
  VIDEOBANNER,
  VISUALUX,
} from "@/Configurations/CommonQuery";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import Email from "@/Components/Email/Email";
import FAQS from "@/Components/FAQ/FAQS";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import LatestNews from "@/Components/LatestNews/LatestNews";
import ContactForm from "../contact-us/Components/ContactForm";
import ServiceProcess from "@/Components/Services/ServiceProcess";
import ServiceDetailsEx from "@/Components/ServicesDetailsComponents/ServiceDetailsEX";
import VideoBanner from "@/Components/VideoComponent/VideoBanner";
import ServicesVisualUx from "@/Components/services-visual-ux/ServicesVisualUx";

export default function CommerceExperince() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("commerceExperience")} />
      <VideoBanner name={pathname} query={VIDEOBANNER("commerceExperience")} />
      <ServiceDetailsEx
        name={pathname}
        query={SERVICEEXPERIENCEDETAILS("commerceExperience")}
      />
      <SliderVertical
        name={pathname}
        query={VERTICAL_SLIDER("commerceExperience")}
      />
      <CTA name={pathname} query={CTA_QUERY("commerceExperience")} />
      <ServiceExperience
        name={pathname}
        query={SERVICE_EXP_QUERY("commerceExperience")}
      />
      <ServiceProcess
        name={pathname}
        query={SERVICE_PROCESS("commerceExperience")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("commerceExperience")} />
      <ServicesVisualUx
        name={pathname}
        query={VISUALUX("commerceExperience")}
      />
      <FAQS name={pathname} query={FAQ("commerceExperience")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("commerceExperience")}
      />
      <LatestNews name={pathname} query={LATEST_NEWS("commerceExperience")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("commerceExperience")}
      />
    </>
  );
}
