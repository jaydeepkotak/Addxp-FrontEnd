"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { SUPPORTS_PLANS } from "../Query/StrapiSupportQuery.js";
import Link from "next/link";

export default function BrandValues() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: SUPPORTS_PLANS,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.strapiSupportAndMaintenance);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='table-component' id='supportPlans'>
      <div className='container'>
        <h5>{userDetails?.data.attributes.support_plan_title.data.attributes.IntroductionTitle.Title}</h5>
        <RichText
          htmlContent={userDetails?.data.attributes.support_plan_title.data.attributes.IntroductionTitle.Description}
        ></RichText>
        <div className='row sticky-div'>
          <div className='col-lg-4 col-md-none'></div>
          {userDetails?.data.attributes.support_plan_title.data.attributes.Column.map((item: any) => (
            <div className='col-lg-4 col-6' key={item.id}>
              <div className='main-point-box equalheight6'>{item.Title}</div>
            </div>
          ))}
        </div>
        <div className='table-content'>
          {userDetails?.data.attributes.support_plan_title.data.attributes.support_values.data.map((data: any) => (
            <div className='row' key={data.id}>
              <div className='col-lg-4 col-12'>
                <div className='point-differentiator-box'>{data.attributes.RowTitle.Title}</div>
              </div>
              {data.attributes.RowData.map((subdata: any) => (
                <div className='col-lg-4 col-6' key={subdata.id}>
                  {subdata.Link == null ? (
                    <div className='point-difference-box equalheight'>{subdata.RowData}</div>
                  ) : (
                    <Link href={subdata.Link.href} className='point-difference-box equalheight d-block'>
                      {subdata.Link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
