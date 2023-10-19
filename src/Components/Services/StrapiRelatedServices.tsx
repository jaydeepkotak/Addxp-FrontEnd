"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

export default function StrapiRelatedServices(props: any) {
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
      if (props.name == "/hire-strapi-developer") {
        const response = await axios(config);
        setUserDetails(response.data.data.hireStrapiDeveloper);
      }
      if (props.name == "/commerce-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.commerceExperience);
      }
      if (props.name == "/content-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentExperience);
      }
      if (props.name == "/user-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.userExperience);
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
      <section className='two-service-component'>
        <div className='container'>
          <h5>
            {userDetails?.data.attributes.service_title.data.attributes.StrapiTitle[0].Title}
            {/* {
              userDetails?.data.attributes.related_services.data[0].attributes
                .Title.Title
            } */}
          </h5>
          <RichText
            htmlContent={userDetails?.data.attributes.service_title.data.attributes.StrapiTitle[0].Description}
          ></RichText>
          <div className='row'>
            {userDetails?.data.attributes.related_services.data.map((item: any) => (
              // eslint-disable-next-line react/jsx-key
              <div className='col-md-6' key={item.id}>
                <div className='two-service-bg'>
                  <RichText htmlContent={item.attributes.ServiceDetails.Body}></RichText>
                  <RichText htmlContent={item.attributes.ServiceDetails.Summary}></RichText>

                  <Link href={`${item.attributes.ServiceDetails.Links.href}`} className='btn-defualt'>
                    {item.attributes.ServiceDetails.Links.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
