"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

export default function Banner(props: any) {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };

  async function fetchdata() {
    try {
      if (props.name == "/contact-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.contactUs);
      }
      if (props.name == "/about-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.aboutUs);
      }
      if (props.name == "/sitemap") {
        const response = await axios(config);
        setUserDetails(response.data.data.sitemap);
      }
      if (props.name == "/careers") {
        const response = await axios(config);
        setUserDetails(response.data.data.career);
      }

      if (props.name == "/contentful-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentfulCmsService);
      }
      if (props.name == "/contentstack-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentstackCmsService);
      }
      if (props.name == "/umbraco-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.umbracoDevelopmentService);
      }
      if (props.name == "/strapi-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiCmsService);
      }
      if (props.name == "/kentico-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kenticoDevelopmentService);
      }
      if (props.name == "/kontent-ai-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kontentAiDevelopmentService);
      }
      if (props.name == "/virto-commerce-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.virtoCommerceService);
      }
      if (props.name == "/strapi-cms-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiDevelopment);
      }
      if (props.name == "/strapi-plugin-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiPluginDevelopment);
      }
      if (props.name == "/strapi-upgrade-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUpgrade);
      }
      if (props.name == "/strapi-migration-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiMig);
      }
      if (props.name == "/strapi-cms-consultation-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiConsultation);
      }
      if (props.name == "/strapi-support-maintenance-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiSupportAndMaintenance);
      }
      if (props.name == "/strapi-ui-design-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUiUxDesign);
      }
      if (props.name == "/hire-strapi-developer") {
        const response = await axios(config);
        setUserDetails(response.data.data.hireStrapiDeveloper);
      }
      if (props.name == "/blogs-insights") {
        const response = await axios(config);
        setUserDetails(response.data.data.blogsInsight);
      }
      if (props.name == "/brand-guidelines") {
        const response = await axios(config);
        setUserDetails(response.data.data.brandGuideline);
      }
      if (props.name == "/press-release") {
        const response = await axios(config);
        setUserDetails(response.data.data.pressRelease);
      }
      if (props.name == "/ui-ux-designer") {
        const response = await axios(config);
        setUserDetails(response.data.data.uiUxDesigner);
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
    setTimeout(() => {
      const elements = document.getElementsByClassName("contact-banner");
      if (elements.length === 0) {
        return;
      }
      for (let i = 0; i < elements.length; i++) {
        const src = elements[i].getAttribute("data-img-src");
        if (src) {
          const elementWithStyle = elements[i] as HTMLElement;
          elementWithStyle.style.backgroundImage = `url(${src})`;
        }
      }
    }, 500);
  }, []);
  return (
    <section
      className='contact-banner'
      data-img-src={
        strapi.strapihost + userDetails?.data.attributes.banner.data.attributes.backgroundImg.data.attributes.url
      }
    >
      <div className='container'>
        <div className='contact-main'>
          <h1>{userDetails?.data.attributes.banner.data.attributes.Banner.Title}</h1>
          <RichText htmlContent={userDetails?.data.attributes.banner.data.attributes.Banner.Description} />
          {userDetails?.data.attributes.banner.data.attributes.BannerLink.href == null ? (
            ""
          ) : (
            <>
              <Link href={userDetails?.data.attributes.banner.data.attributes.BannerLink.href} className='btn-defualt'>
                {userDetails?.data.attributes.banner.data.attributes.BannerLink.label}
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
