"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function ServiceExperience(props: any) {
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
      if (props.name == "/contentstack-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentstackCmsService);
      }
      if (props.name == "/contentful-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentfulCmsService);
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
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <section className='feature-component'>
        <div className='container'>
          <div className='feature-bg'>
            <h5>{userDetails?.data.attributes.experience.data.attributes.ServiceTitle.Title}</h5>
            <p>{userDetails?.data.attributes.experience.data.attributes.ServiceTitle.SubTitle}</p>
            <div className='row'>
              {userDetails?.data.attributes.experience.data.attributes.Experience.map((item: any) => (
                <div className='col-md-6' key={item.id}>
                  <div className='feature-list'>
                    <img
                      src={strapi.strapihost + item.Images.data[0].attributes.url}
                      alt={item.Images.data[0].attributes.alternativeText}
                    />
                    <div className='feature-desc'>
                      <div className='type2'>{item.Title}</div>
                      <RichText htmlContent={item.Description}></RichText>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
