"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function ServiceTitle(props: any) {
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
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="strapi-half-image">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="strapi-left">
              <span className="tag-line">
                {
                  userDetails?.data.attributes.service_title.data.attributes
                    .ServiceTitle.Title
                }
              </span>
              <h5>
                <RichText
                  htmlContent={
                    userDetails?.data.attributes.service_title.data.attributes
                      .ServiceTitle.Description
                  }
                ></RichText>
              </h5>
              <RichText
                htmlContent={
                  userDetails?.data.attributes.service_title.data.attributes
                    .ServiceTitle.Body
                }
              ></RichText>
            </div>
          </div>
          <div className="col-md-6">
            <div className="strapi-right">
              <img
                className="w-auto"
                src={
                  strapi.strapihost +
                  userDetails?.data.attributes.service_title.data.attributes
                    .ServiceTitle.Images.data[0].attributes.url
                }
                alt={
                  userDetails?.data.attributes.service_title.data.attributes
                    .ServiceTitle.Images.data[0].attributes.alternativeText
                }
              />
              {
                userDetails?.data.attributes.service_title.data.attributes
                  .ServiceTitle.Images.data[0].attributes.alternativeText
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
