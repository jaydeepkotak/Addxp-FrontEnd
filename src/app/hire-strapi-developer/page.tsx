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
  STRAPI_RELATED_SERVICES,
  VERTICAL_SLIDER,
} from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import EngagementModel from "./Components/EngagementModel";
import Availability from "./Components/Availability";
import StrapiResources from "./Components/StrapiResources";
import { INNOVATIONS } from "../about-us/Query/AboutUsQuery";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OwlTabSlider from "./Components/OwlTabSlider";

export default function Hirestrapideveloper() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("hireStrapiDeveloper")} />

      <Banner name={pathname} query={BANNER_QUERY("hireStrapiDeveloper")} />
      <StrapiResources
        name={pathname}
        query={INNOVATIONS("hireStrapiDeveloper")}
      />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("hireStrapiDeveloper")}
      />
      <OwlTabSlider />
      <Email name={pathname} query={FORM_TITLE_QUERY("hireStrapiDeveloper")} />
      <CTA name={pathname} query={CTA_QUERY("hireStrapiDeveloper")} />
      <EngagementModel />
      <Availability />
      <SliderVertical
        name={pathname}
        query={VERTICAL_SLIDER("hireStrapiDeveloper")}
      />
      <Email name={pathname} query={FORM_TITLE_QUERY("hireStrapiDeveloper")} />
      <ServicesDetails
        name={pathname}
        query={SERVICES_DETILS_QUERY("hireStrapiDeveloper")}
      />
      <FAQS name={pathname} query={FAQ("hireStrapiDeveloper")} />
      <StrapiRelatedServices
        name={pathname}
        query={STRAPI_RELATED_SERVICES("hireStrapiDeveloper")}
      />
      <LatestNews name={pathname} query={LATEST_NEWS("hireStrapiDeveloper")} />
      <ContactForm
        name={pathname}
        query={CONTACT_FORM_TITLE_QUERY("hireStrapiDeveloper")}
      />
    </>
  );
}
