"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { ENGAGE_MODEL } from "../Query/HireQuery.js";

export default function EngagementModel() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: ENGAGE_MODEL,
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
    <section className='our-engagement-section'>
      <div className='container'>
        <div className='our-engagement-bg'>
          <div className='engagement-top'>
            <h5>{userDetails?.data.attributes.engagement_model.data.attributes.MainTitle.Title}</h5>
            <RichText
              htmlContent={userDetails?.data.attributes.engagement_model.data.attributes.MainTitle.Description}
            ></RichText>
          </div>
          <div className='row'>
            {userDetails?.data.attributes.engagement_model.data.attributes.MultilistData.map((item: any) => (
              <div className='col-md-6' key={item.id}>
                <div className='enegagement-box'>
                  <h5>{item.Title}</h5>
                  <RichText htmlContent={item.Description}></RichText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
