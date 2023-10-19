"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function ServiceProcess(props: any) {
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
  return (
    <section className='services-process-wrapper'>
      <div className='container'>
        <span className='tag-line'>
          {userDetails?.data.attributes.services_process.data.attributes.ServiceTitle.Title}
        </span>
        <h5> {userDetails?.data.attributes.services_process.data.attributes.ServiceTitle.SubTitle}</h5>

        <div className='services-process-wrapper_list'>
          {userDetails?.data.attributes.services_process.data.attributes.ServiceList.map((item: any) => (
            <div className='list_item' key={item.id}>
              <div className='list_item_title'>
                <img
                  src={strapi.strapihost + item.Image.data.attributes.url}
                  alt={item.Image.data.attributes.alternativeText}
                />
                <span>{item.Title}</span>
              </div>

              <RichText htmlContent={item.Description}></RichText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
