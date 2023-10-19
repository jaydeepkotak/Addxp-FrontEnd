"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { AVAILABILITY } from "../Query/HireQuery.js";

export default function Availability() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: AVAILABILITY,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.hireStrapiDeveloper);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="right-image-component">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="right-image-left">
              <span className="tag-line">
                {
                  userDetails?.data.attributes.availability.data.attributes
                    .Availability.Title
                }
              </span>
              <RichText
                htmlContent={
                  userDetails?.data.attributes.availability.data.attributes
                    .Availability.Description
                }
              ></RichText>
              <RichText
                htmlContent={
                  userDetails?.data.attributes.availability.data.attributes
                    .Availability.Body
                }
              ></RichText>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-image-right">
              <img
                src={
                  strapi.strapihost +
                  userDetails?.data.attributes.availability.data.attributes
                    .Availability.Images.data[0].attributes.url
                }
                alt={
                  userDetails?.data.attributes.availability.data.attributes
                    .Availability.Images.data[0].attributesalternativeText
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
