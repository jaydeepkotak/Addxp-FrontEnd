"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import Link from "next/link";

export default function BannerNav(props: any) {
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
      if (props.name == "/about-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.aboutUs);
      }
      if (props.name == "/contact-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.contactUs);
      }
      if (props.name == "/careers") {
        const response = await axios(config);
        setUserDetails(response.data.data.career);
      }
      if (props.name == "/") {
        const response = await axios(config);
        setUserDetails(response.data.data.home);
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
    <div className='tab-menu'>
      <div className='container'>
        <ul>
          {userDetails?.data.attributes.banner_navigation.data.attributes.NavLink.map((item: any) => (
            <li key={item.id}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
