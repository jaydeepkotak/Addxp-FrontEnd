"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common";

export default function StrapiResources(props: any) {
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
      if (props.name == "/hire-strapi-developer") {
        const response = await axios(config);
        setUserDetails(response.data.data.hireStrapiDeveloper);
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
    <section className='why-hire-section'>
      <div className='container'>
        <div className='hire-cms-box'>
          <div className='hire-cms-left'>
            <span className='tag-line'>
              {userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Title}
            </span>
            <h5>{userDetails?.data.attributes.innovation.data.attributes.Innovation[0].SubTitle}</h5>
            <RichText
              htmlContent={userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Body}
            ></RichText>
            <div className='hire-cms-bottom'>
              <div className='row'>
                {userDetails?.data.attributes.innovation.data.attributes.counter.data.map((counterdata: any) =>
                  counterdata.attributes.AboutCounter.map((subdata: any) => (
                    <div className='col-lg-3 stats' key={subdata.id}>
                      <div className='counter-box'>
                        <h5 className='counting'>
                          <CountUp start={0} end={subdata.counter} enableScrollSpy={true} scrollSpyDelay={3}>
                            {({ countUpRef, start }) => <span ref={countUpRef} />}
                          </CountUp>
                        </h5>
                        <span className='plus'>+</span>
                      </div>
                      <RichText htmlContent={subdata.CounterDesc}></RichText>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className='hire-cms-right'>
            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes.url
              }
              alt={
                userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes
                  .alternativeText
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
