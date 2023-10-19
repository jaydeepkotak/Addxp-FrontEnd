"use client";
import { NOTFOUND } from "../Components/Navigations/Query/NavigationQuery.js";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../Configurations/Config.json";
import { useEffect, useState } from "react";
import RichText from "@/Components/Common.jsx";

import { usePathname } from "next/navigation.js";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
export default function PageNotFound() {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: NOTFOUND,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.pageNotFound);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
    setTimeout(() => {
      const elements = document.getElementsByClassName("banner-js");
      if (elements.length === 0) {
        return;
      }
      for (let i = 0; i < elements.length; i++) {
        const src = elements[i].getAttribute("data-img-src");

        if (src) {
          const elementWithStyle = elements[i] as HTMLElement;
          elementWithStyle.style.backgroundImage = `url(${src})`;
        }
      }
    }, 500);
  }, []);
  return (
    <>
      <SEOData name={pathname} query={SEO("pageNotFound")} />
      <section
        className="about-banner page-not-found banner-js"
        data-img-src={
          strapi.strapihost +
          userDetails?.data.attributes.Description.Images.data[0].attributes.url
        }
      >
        <div className="container">
          <h1 className="d-none">
            {userDetails?.data.attributes.Description.Title}
          </h1>
          <h5> {userDetails?.data.attributes.Description.SubTitle}</h5>
          <RichText
            htmlContent={userDetails?.data.attributes.Description.Description}
          ></RichText>
          <a
            href={userDetails?.data.attributes.GoBackLink.href}
            className="btn-defualt"
          >
            {userDetails?.data.attributes.GoBackLink.label}
          </a>
        </div>
      </section>
    </>
  );
}
