"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
interface UserData {
  data: any;
}

export default function Empowerments() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: `query{
        aboutUs{
          data{
            attributes{
              Empowerments{
                id
                empowerTitle
                empowerSubtitle
                empowerDescription
                empowerImages{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    },
  };

  async function fetchdata() {
    try {
      console.log("try");
      const response = await axios(config);
      setUserDetails(response.data.data.aboutUs);
      console.log("add data");
      console.log("log = ", response.data.data.aboutUs);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='journey-component'>
      <div className='container'>
        <div className='journey-main'>
          <small>{userDetails?.data.attributes.Empowerments.empowerSubtitle}</small>
          <h5>{userDetails?.data.attributes.Empowerments.empowerTitle}</h5>
          <RichText htmlContent={userDetails?.data.attributes.Empowerments.empowerDescription}></RichText>
          <img
            src={strapi.strapihost + userDetails?.data.attributes.Empowerments.empowerImages.data.attributes.url}
            alt='journey-image'
          />
        </div>
      </div>
    </section>
  );
}
