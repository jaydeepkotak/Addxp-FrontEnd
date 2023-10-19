"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

export default function OurServices(props: any) {
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
      if (props.name == "/strapi-cms-consultation-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiConsultation);
      }
      if (props.name == "/strapi-support-maintenance-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiSupportAndMaintenance);
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
      {props.name === "/strapi-cms-development-service" ||
      props.name === "/strapi-cms-consultation-service" ||
      props.name === "/strapi-support-maintenance-service" ? (
        <section className="strapi-services-component">
          <div className="container">
            <span className="tag-line">
              {
                userDetails?.data.attributes.our_service.data.attributes
                  .ComponentInfo.Title
              }
            </span>
            <h5>
              {
                userDetails?.data.attributes.our_service.data.attributes
                  .ComponentInfo.SubTitle
              }
            </h5>
            <div className="row">
              {userDetails?.data.attributes.our_service.data.attributes.ServiceList.map(
                (item: any) => (
                  <div className="col-md-4" key={item.id}>
                    <div className="strapi-service-box">
                      <RichText htmlContent={item.Body}></RichText>
                      <RichText htmlContent={item.Summary}></RichText>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="three-item-component">
          <div className="container">
            <span className="tag-line">
              {
                userDetails?.data.attributes.our_service.data.attributes
                  .ComponentInfo.Title
              }
            </span>
            <h5>
              {
                userDetails?.data.attributes.our_service.data.attributes
                  .ComponentInfo.SubTitle
              }
            </h5>
            <div className="row">
              {userDetails?.data.attributes.our_service.data.attributes.ServiceList.map(
                (item: any) => (
                  <div className="col-md-4" key={item.id}>
                    <Link href={item.Links.href} className="three-item-box">
                      <div className="large">
                        <RichText htmlContent={item.Body}></RichText>
                      </div>
                      <RichText htmlContent={item.Summary}></RichText>
                      <span className="btn-defualt">{item.Links.label}</span>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
