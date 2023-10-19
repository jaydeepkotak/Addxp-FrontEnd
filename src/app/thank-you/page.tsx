"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { THANKS_QUERY } from "../../Configurations/CommonQuery.js";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import { usePathname } from "next/navigation";

export default function Thankyou() {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: THANKS_QUERY,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.thankYou);
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
      <SEOData name={pathname} query={SEO("thankYou")} />
      <section className='thank-you-wrapper'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <div className='thank-you-wrapper-content'>
                <h5>{userDetails?.data.attributes.ThankYou.Title}</h5>
                <RichText htmlContent={userDetails?.data.attributes.ThankYou.Description}></RichText>
              </div>
            </div>

            <div className='col-md-5'>
              <img
                src={strapi.strapihost + userDetails?.data.attributes.ThankYou.Images.data[0].attributes.url}
                alt={userDetails?.data.attributes.ThankYou.Images.data[0].attributes.alternativeText}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
