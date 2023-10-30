"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function StrapiServiceCard(props: any) {
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
      if (props.name == "/strapi-plugin-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiPluginDevelopment);
      }
      if (props.name == "/strapi-upgrade-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUpgrade);
      }
      if (props.name == "/strapi-migration-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiMig);
      }
      if (props.name == "/strapi-ui-design-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUiUxDesign);
      }
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
      <section className='pluging-right-image-component'>
        <div className='container'>
          {userDetails?.data.attributes.service_card.data.attributes.MainTitle.Title == null ? null : (
            <span className='tag-line'>
              {userDetails?.data.attributes.service_card.data.attributes.MainTitle.Title}
            </span>
          )}
          {userDetails?.data.attributes.service_card.data.attributes.MainTitle.SubTitle == null ? null : (
            <h5>{userDetails?.data.attributes.service_card.data.attributes.MainTitle.SubTitle}</h5>
          )}

          <div className='row pluging-mian'>
            <div className='col-md-6'>
              <div className='pluging-box'>
                {userDetails?.data.attributes.service_card.data.attributes.Details.Body == null ? null : (
                  <RichText
                    htmlContent={userDetails?.data.attributes.service_card.data.attributes.Details.Body}
                  ></RichText>
                )}
                {userDetails?.data.attributes.service_card.data.attributes.Details.Summary == null ? null : (
                  <RichText
                    htmlContent={userDetails?.data.attributes.service_card.data.attributes.Details.Summary}
                  ></RichText>
                )}
              </div>
            </div>
            {userDetails?.data.attributes.service_card.data.attributes.Details.Images.data == null ? null : (
              <div className='col-md-6'>
                <img
                  src={
                    strapi.strapihost +
                    userDetails?.data.attributes.service_card.data.attributes.Details.Images.data.attributes.url
                  }
                  alt={
                    userDetails?.data.attributes.service_card.data.attributes.Details.Images.data.attributes
                      .alternativeTextl
                  }
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
