"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function BuisinessGuidelines(props: any) {
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
      const response = await axios(config);
      setUserDetails(response.data.data.brandGuideline);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className='brand-bottom'>
      <RichText htmlContent={userDetails?.data.attributes.business.data.attributes.Description}></RichText>
      <ul>
        {userDetails?.data.attributes.business.data.attributes.Tagline.map((item: any) => (
          <li key={item.id}>{item.Title}</li>
        ))}
      </ul>
    </div>
  );
}
