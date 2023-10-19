"use client";
import { usePathname } from "next/navigation";
import ServiceTitle from "../../Components/Services/ServiceTitle";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";
import {
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  SERVICE_EXP_QUERY,
  SERVICE_PROCESS,
  STRAPI_RELATED_SERVICES,
  VERTICAL_SLIDER,
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

export default function ContentExperince() {
  const pathname = usePathname();
  return (
    <>
      {/* <SEOData name={pathname} query={SEO("kontentAiDevelopmentService")} /> */}
      <SliderVertical name={pathname} query={VERTICAL_SLIDER("contentExperience")} />
      <CTA name={pathname} query={CTA_QUERY("contentExperience")} />
      <ServiceExperience name={pathname} query={SERVICE_EXP_QUERY("contentExperience")} />
      <ServiceProcess name={pathname} query={SERVICE_PROCESS("contentExperience")} />
      <Email name={pathname} query={FORM_TITLE_QUERY("contentExperience")} />
      <FAQS name={pathname} query={FAQ("contentExperience")} />
      <StrapiRelatedServices name={pathname} query={STRAPI_RELATED_SERVICES("contentExperience")} />
      <LatestNews name={pathname} query={LATEST_NEWS("contentExperience")} />
      <ContactForm name={pathname} query={CONTACT_FORM_TITLE_QUERY("contentExperience")} />
    </>
  );
}
