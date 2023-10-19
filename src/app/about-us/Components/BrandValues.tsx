"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { BRAND_VALUES } from "../Query/AboutUsQuery.js";

export default function BrandValues() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: BRAND_VALUES,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.aboutUs);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="what-we-compoent" id="brand-values">
      <div className="container">
        {userDetails?.data.attributes.brand_value.data.attributes.BrandValues.map(
          (item: any) => (
            <div className="row align-items-center black-bg" key={item.id}>
              <div className="col-md-5">
                <div className="weekday-desc">
                  <span className="tag-line">{item.SubTitle}</span>
                  <h5>{item.Title}</h5>
                  <RichText htmlContent={item.Body}></RichText>
                </div>
              </div>
              <div className="col-md-7">
                <div className="quote-image">
                  <img
                    src={strapi.strapihost + item.Images.data[0].attributes.url}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
