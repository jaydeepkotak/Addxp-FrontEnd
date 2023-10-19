"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";

export default function Keytagline(props: any) {
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
      const response = await axios(config);
      setUserDetails(response.data.data.brandGuideline);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='brand-two-coloum'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='brand-left'>
              <h5>{userDetails?.data.attributes.key_tagline.data.attributes.MainTitle}</h5>
              <ul>
                {userDetails?.data.attributes.key_tagline.data.attributes.Subtagline.map((item: any) => (
                  <li key={item.id}>
                    {item.Number <= 9 ? (
                      <span className='number'>0{item.Number}</span>
                    ) : (
                      <span className='number'>0{item.Number}</span>
                    )}

                    <span>{item.Title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='brand-right'>
              <img
                src={
                  strapi.strapihost + userDetails?.data.attributes.key_tagline.data.attributes.Image.data.attributes.url
                }
                alt={userDetails?.data.attributes.key_tagline.data.attributes.Image.data.attributes.alternativeText}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
