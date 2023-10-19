"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { TERMS_CONDITION } from "../../terms-conditions/Query/PrivatePolicyQuery";

export default function TermsCondition() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: TERMS_CONDITION,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.termsCondition);
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
        <h5>{userDetails?.data.attributes.TermsConditions.Title}</h5>
        <RichText htmlContent={userDetails?.data.attributes.TermsConditions.Description}></RichText>
      </div>
    </section>
  );
}
