"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

export default function ServicesVisualUx(props: any) {
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
      if (props.name == "/commerce-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.commerceExperience);
      }
      if (props.name == "/content-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentExperience);
      }
      if (props.name == "/user-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.userExperience);
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  const [isSwitchOn, SetisSwitchOn] = useState(false);

  return (
    <>
      <section className="services-visual-ux-wrapper">
        <div className="container">
          {userDetails?.data.attributes.visual_ux.data.attributes.strapi_title
            .data == null ? null : (
            <>
              <span className="tag-line desktop">
                {
                  userDetails?.data.attributes.visual_ux.data.attributes
                    .strapi_title.data.attributes.StrapiTitle[0].Title
                }
              </span>
              <RichText
                htmlContent={
                  userDetails?.data.attributes.visual_ux.data.attributes
                    .strapi_title.data.attributes.StrapiTitle[0].Description
                }
              ></RichText>
            </>
          )}

          <div className="switch-button">
            <div className="button-cover">
              <div
                className={`button r ${isSwitchOn ? "switch-on" : ""}`}
                id="button-1"
                onClick={(e) => SetisSwitchOn(!isSwitchOn)}
              >
                <input type="checkbox" className="checkbox" />
                <div className="knobs"></div>
                <div className="layer"></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`switch-wrapper ${isSwitchOn ? "ux-on" : ""}`}>
          <img
            src={
              strapi.strapihost +
              userDetails?.data.attributes.visual_ux.data.attributes.TabImage
                .ImageDesktop.data.attributes.url
            }
            alt={
              userDetails?.data.attributes.visual_ux.data.attributes.TabImage
                .ImageDesktop.data.attributes.alternativeText
            }
            className="switch-wrapper_screen"
          />
          <img
            src={
              strapi.strapihost +
              userDetails?.data.attributes.visual_ux.data.attributes.TabImage
                .ImageMobile.data.attributes.url
            }
            alt={
              userDetails?.data.attributes.visual_ux.data.attributes.TabImage
                .ImageMobile.data.attributes.alternativeText
            }
            className="switch-wrapper_screen"
          />

          <div className="switch-wrapper-items">
            <Link
              href={`${userDetails?.data.attributes.visual_ux.data.attributes.Links.href}`}
            >
              {userDetails?.data.attributes.visual_ux.data.attributes.AllImg.map(
                (item: any) => (
                  <img
                    key={item.id}
                    src={strapi.strapihost + item.Images.data[0].attributes.url}
                    alt={item.Images.data[0].attributes.alternativeText}
                    className="switch-wrapper-screen"
                  />
                )
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
