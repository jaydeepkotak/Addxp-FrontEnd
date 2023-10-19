"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { PRIVATE_POLICY } from "../../privacy-policy/Query/PrivatePolicyQuery";

export default function PrivatePolicy() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: PRIVATE_POLICY,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.privacyPolicy);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='privacy-policy-section'>
      <div className='container'>
        <h5>{userDetails?.data.attributes.PrivatePolicy.Title}</h5>
        <RichText htmlContent={userDetails?.data.attributes.PrivatePolicy.Description}></RichText>
      </div>
    </section>
  );
}
