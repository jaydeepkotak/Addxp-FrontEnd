"use client";
import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { CALENDER_QUERY } from "../Query/StrapiConsultationQuery.js";
import { InlineWidget } from "react-calendly";

export default function Calender() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: CALENDER_QUERY,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.strapiConsultation);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="strapi-cms-calendly">
      <div className="container">
        <div className="calendly-form-title">
          <div className="calendly-text">
            <h5>
              {
                userDetails?.data.attributes.calender.data.attributes.MainTitle
                  .Title
              }
            </h5>
            <RichText
              htmlContent={
                userDetails?.data.attributes.calender.data.attributes.MainTitle
                  .Description
              }
            ></RichText>
          </div>
          <div className="calendly-inline-widget">
            <InlineWidget url="https://calendly.com/addact-nimesh/30min?hide_event_type_details=1&hide_gdpr_banner=1&text_color=#E97777&primary_color=#E97777" />
          </div>
        </div>
      </div>
    </section>
  );
}
