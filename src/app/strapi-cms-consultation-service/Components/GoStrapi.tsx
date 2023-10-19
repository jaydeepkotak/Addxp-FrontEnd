"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { GO_STRAPI_QUERY } from "../Query/StrapiConsultationQuery.js";

export default function GoStrapi() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: GO_STRAPI_QUERY,
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
    <section className='why-go-strapi-component'>
      <div className='container'>
        <div className='go-strapi-cms'>
          <p className='tag-line'>{userDetails?.data.attributes.go_strapi.data.attributes.StrapiDesc.Title}</p>
          <div className='strapi-img-text'>
            <div className='strapi-content'>
              <h5>{userDetails?.data.attributes.go_strapi.data.attributes.StrapiDesc.SubTitle}</h5>
              <RichText
                htmlContent={userDetails?.data.attributes.go_strapi.data.attributes.StrapiDesc.Description}
              ></RichText>
            </div>

            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.go_strapi.data.attributes.StrapiDesc.Images.data[0].attributes.url
              }
              alt={
                userDetails?.data.attributes.go_strapi.data.attributes.StrapiDesc.Images.data[0].attributes
                  .alternativeText
              }
            />
          </div>
          <div className='strapi-numbering-points'>
            {userDetails?.data.attributes.go_strapi.data.attributes.Details.map((item: any) => (
              <div className='points-text-box' key={item.id}>
                <div className='point-title'>
                  <p>{item.Title}</p>
                  <p className='number-big'>{item.Number}</p>
                </div>
                <RichText htmlContent={item.Description}></RichText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
