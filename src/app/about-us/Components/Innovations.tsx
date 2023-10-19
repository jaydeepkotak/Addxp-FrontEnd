"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common";

export default function Innovations(props: any) {
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
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='weekday-component static-component' id='who-are-we'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-md-5'>
            <div className='quote-image'>
              <img
                src={
                  strapi.strapihost +
                  userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes.url
                }
              />
            </div>
          </div>
          <div className='col-md-7'>
            <div className='weekday-desc'>
              <span className='tag-line'>
                {userDetails?.data.attributes.innovation.data.attributes.Innovation[0].SubTitle}
              </span>
              <h5>{userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Title}</h5>
              <div className='quote-image'>
                <img
                  src={
                    strapi.strapihost +
                    userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes.url
                  }
                  alt={
                    userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes
                      .alternativeText
                  }
                  className='static-image-mobile'
                />
              </div>
              <RichText
                htmlContent={userDetails?.data.attributes.innovation.data.attributes.Innovation[0].Body}
              ></RichText>
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
        </div>
      </div>
    </section>
  );
}
