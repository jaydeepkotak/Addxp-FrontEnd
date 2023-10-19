"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function ExpertResource(props: any) {
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
      <section className='strapi-right-image'>
        <div className='container'>
          <div className='strapi-right-bg'>
            <div className='strapi-image-left'>
              <h5>{userDetails?.data.attributes.expert_resource.data.attributes.ExpertResource[0].Title}</h5>
              <RichText
                htmlContent={userDetails?.data.attributes.expert_resource.data.attributes.ExpertResource[0].Description}
              ></RichText>
            </div>
            <div className='strapi-image-right'>
              <img
                src={
                  strapi.strapihost +
                  userDetails?.data.attributes.expert_resource.data.attributes.ExpertResource[0].Image.data.attributes
                    .url
                }
                alt={
                  userDetails?.data.attributes.expert_resource.data.attributes.ExpertResource[0].Image.data.attributes
                    .alternativeText
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
