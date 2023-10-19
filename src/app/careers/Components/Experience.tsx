"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { EXPERIENCE } from "../Query/CareerQuery.js";
export default function Experience() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: EXPERIENCE,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.career);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='item-component' id='perks'>
      <div className='container'>
        <span className='tag-line'>{userDetails?.data.attributes.ExperienceTitle[0].SubTitle}</span>

        <h5> {userDetails?.data.attributes.ExperienceTitle[0].Title}</h5>
        <div className='row'>
          {userDetails?.data.attributes.experiences.data.map((item: any) =>
            item.attributes.Experience.map((subitem: any) => (
              <div className='col-md-4' key={subitem.id}>
                <div className='item-box'>
                  <div className='type7'>
                    {subitem.Title}

                    <img
                      src={strapi.strapihost + subitem?.Images.data[0].attributes.url}
                      alt={subitem?.Images.data[0].attributes.alternativeText}
                    />
                  </div>
                  <RichText htmlContent={subitem.Body}></RichText>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
