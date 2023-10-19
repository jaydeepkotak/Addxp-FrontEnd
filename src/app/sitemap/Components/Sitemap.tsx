"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import { SITEMAP } from "../../sitemap/Query/SitemapQuery";
import Link from "next/link";

export default function Sitemap() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: SITEMAP,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.sitemap);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="sitemap-section">
      <div className="container">
        <div className="sitemap-title">
          <Link href={`${userDetails?.data.attributes.HomeLinks[0].href}`}>
            {userDetails?.data.attributes.HomeLinks[0].label}
          </Link>
        </div>

        <div className="sitemap-services">
          <div className="sitemap-title sitemap-title-services">Services</div>

          <div className="sitemap-services-list">
            <div className="row">
              <div className="col-md-6 col-12">
                <Link
                  href={`${userDetails?.data.attributes.StrapiServices.LinkIcons[0].href}`}
                  className="hover-border-left"
                >
                  <img
                    src={
                      strapi.strapihost +
                      userDetails?.data.attributes.StrapiServices.Icons.data
                        .attributes.url
                    }
                    alt={
                      userDetails?.data.attributes.StrapiServices.Icons.data
                        .attributes.alternativeText
                    }
                    className="hover-border-left"
                  />
                </Link>
                <ul>
                  {userDetails?.data.attributes.StrapiChild.map(
                    (strapichild: any) => (
                      <div key={strapichild.id}>
                        <Link href={strapichild.href}>
                          <li>
                            <p>{strapichild.label}</p>
                          </li>
                        </Link>
                      </div>
                    )
                  )}
                </ul>
              </div>
              <div className="col-md-6 col-12 services-images">
                {userDetails?.data.attributes.ServicesImage.map(
                  (serviceimg: any) => (
                    <div key={serviceimg.id}>
                      <Link
                        href={`${serviceimg.LinkIcons[0].href}`}
                        className="hover-border-left"
                      >
                        <img
                          src={
                            strapi.strapihost +
                            serviceimg.Icons.data.attributes.url
                          }
                          alt={serviceimg.Icons.data.attributes.alternativeText}
                        />
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-12">
            <div className="sitemap-title">
              {userDetails?.data.attributes.CompanyTitle}
            </div>
            {userDetails?.data.attributes.CompanyLinks.map((company: any) => (
              <div className="sitemap-subtitle" key={company.id}>
                <Link href={`${company.Links[0].href}`}>
                  <div className="icon-text">
                    <span className={company.Class}></span>
                    {company.Links[0].label}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="col-md-6 col-12">
            <div className="sitemap-title">
              {userDetails?.data.attributes.InsightsTitle}
            </div>
            {userDetails?.data.attributes.InsightsLinks.map((insights: any) => (
              <div className="sitemap-subtitle" key={insights.id}>
                <Link href={`${insights.Links[0].href}`}>
                  <div className="icon-text">
                    <span className={insights.Class}></span>
                    {insights.Links[0].label}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {userDetails?.data.attributes.OtherLinks.map((otherlinks: any) => (
          <div className={otherlinks.Class} key={otherlinks.id}>
            <Link href={`${otherlinks.Links[0].href}`}>
              {otherlinks.Links[0].label}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
