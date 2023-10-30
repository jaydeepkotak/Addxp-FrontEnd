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

export default function UserExperince() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("userExperience")} />
      <VideoBanner name={pathname} query={VIDEOBANNER("userExperience")} />
      <ServiceDetailsEx
        name={pathname}
        query={SERVICEEXPERIENCEDETAILS("userExperience")}
      />
      <SliderVertical
        name={pathname}
        query={VERTICAL_SLIDER("userExperience")}
      />
      <CTA name={pathname} query={CTA_QUERY("userExperience")} />
      <ServiceExperience
        name={pathname}
        query={SERVICE_EXP_QUERY("userExperience")}
      />
      <ServiceProcess
        name={pathname}
        query={SERVICE_PROCESS("userExperience")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("userExperience")} />
      <ServicesVisualUx name={pathname} query={VISUALUX("userExperience")} />
      <FAQS name={pathname} query={FAQ("userExperience")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("userExperience")}
      />
      <LatestNews name={pathname} query={LATEST_NEWS("userExperience")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("userExperience")}
      />
    </>
  );
}
