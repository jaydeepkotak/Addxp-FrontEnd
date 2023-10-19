"use client";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../../../Configurations/Config.json";
import { WEEKDAYS } from "../Query/ContactusQuery.js";
import RichText from "@/Components/Common";

export default function WeekDays() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: WEEKDAYS,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.contactWeekdays);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='weekday-component' id='weekday-component'>
      <div className='container'>
        {userDetails?.data.map((item: any) =>
          item.attributes.ContactWeekday.map((subitem: any) => (
            <div className='row align-items-center m-0' key={subitem.id}>
              <div className='col-md-5 p-0'>
                <div className='quote-image'>
                  <img src={strapi.strapihost + subitem?.Images.data[0].attributes.url} alt='weekday-image' />
                </div>
              </div>
              <div className='col-md-7 p-0'>
                <div className='weekday-desc'>
                  <h5>
                    <span>{subitem.Title}</span> {subitem.SubTitle}
                  </h5>
                  <RichText htmlContent={subitem.Body}></RichText>
                  <ul>
                    {item.attributes.week_days.data.map((subitemcnt: any) =>
                      subitemcnt.attributes.AboutWeekdays.map((childcnt: any) => (
                        <li key={childcnt.id}>
                          <RichText htmlContent={childcnt.Description}></RichText>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
