"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function DevelopmentProcess(props: any) {
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
      if (props.name == "/strapi-cms-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiDevelopment);
      }
      if (props.name == "/strapi-plugin-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiPluginDevelopment);
      }
      if (props.name == "/strapi-upgrade-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUpgrade);
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
      <section className='development-process-component strapi-up-process'>
        <div className='container'>
          <span className='tag-line'>
            {userDetails?.data.attributes.process_title.data.attributes.ProcessTitle.Title}
          </span>
          <h5>{userDetails?.data.attributes.process_title.data.attributes.ProcessTitle.Subtitle}</h5>
          <RichText
            htmlContent={userDetails?.data.attributes.process_title.data.attributes.ProcessTitle.Description}
          ></RichText>
          <div className='development-box'>
            <ul>
              {userDetails?.data.attributes.process_title.data.attributes.development_process.data.attributes.Details.map(
                (item: any) => (
                  <li key={item.id}>
                    <span>
                      <RichText htmlContent={item.Description}></RichText>
                    </span>

                    <img src={strapi.strapihost + item.Images.data.attributes.url} alt='list-number1' />
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
