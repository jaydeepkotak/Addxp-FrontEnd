"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { EMPOWERMENTS } from "../Query/AboutUsQuery.js";

export default function Empowerments() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: EMPOWERMENTS,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.aboutUs);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="journey-component">
      <div className="container">
        <div className="journey-main">
          <small>{userDetails?.data.attributes.Empowerments.Subtitle}</small>
          <h5>{userDetails?.data.attributes.Empowerments.Title}</h5>
          <RichText
            htmlContent={userDetails?.data.attributes.Empowerments.Description}
          ></RichText>
          <img
            src={
              strapi.strapihost +
              userDetails?.data.attributes.Empowerments.Images.data.attributes
                .url
            }
            alt="journey-image"
          />
        </div>
      </div>
    </section>
  );
}
