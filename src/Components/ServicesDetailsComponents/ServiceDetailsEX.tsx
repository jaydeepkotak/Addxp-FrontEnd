"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);
export default function ServiceDetailsEx(props: any) {
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
    setTimeout(() => {
      const elements = document.getElementsByClassName("cta-component");
      if (elements.length === 0) {
        return;
      }
      for (let i = 0; i < elements.length; i++) {
        const src = elements[i].getAttribute("data-img-src");
        if (src) {
          const elementWithStyle = elements[i] as HTMLElement;
          elementWithStyle.style.backgroundImage = `url(${src})`;
        }
      }
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const mediaQuery = window.matchMedia("(max-width: 1100px)");
      if (mediaQuery.matches) {
        var frame_count = 7,
          offset_value = 50;

        gsap.to(".services-detail-experience-slider_img_item", {
          backgroundPosition: -offset_value * frame_count * 5.721428571428571 + "px 50%",
          ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
          scrollTrigger: {
            trigger: ".scrolling-slider-wrapper",
            start: "top top",
            end: "+=" + frame_count * offset_value,
            pin: ".slider-sticky",
            scrub: true,
          },
        });
      } else {
        var frame_count = 7,
          offset_value = 100;

        gsap.to(".services-detail-experience-slider_img_item", {
          backgroundPosition: -offset_value * frame_count * 5.621428571428571 + "px 50%",
          ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
          scrollTrigger: {
            trigger: ".scrolling-slider-wrapper",
            start: "top top",
            end: "+=" + frame_count * offset_value,
            pin: ".slider-sticky",
            scrub: true,
          },
        });
      }
    }, 1500);
  }, []);

  return props.name == "/commerce-experience" ? (
    <section className='services-detail-experience scrolling-slider-wrapper'>
      <div className='services-detail-experience-slider slider-sticky'>
        <div className='services-detail-experience-title container'>
          {userDetails?.data.attributes.services_detail_experience.data.attributes.MainTitle.Title == null ? null : (
            <h5>{userDetails?.data.attributes.services_detail_experience.data.attributes.MainTitle.Title}</h5>
          )}
          {userDetails?.data.attributes.services_detail_experience.data.attributes.MainTitle.Description ==
          null ? null : (
            <RichText
              htmlContent={
                userDetails?.data.attributes.services_detail_experience.data.attributes.MainTitle.Description
              }
            ></RichText>
          )}
        </div>

        <div className='services-detail-experience-slider'>
          <div className='services-detail-experience-slider_content'>
            {userDetails?.data.attributes.services_detail_experience.data == null ? null : (
              <div className='container'>
                {userDetails?.data.attributes.services_detail_experience.data.attributes.Description.map(
                  (itemdata: any) => (
                    <React.Fragment key={itemdata.id}>
                      {itemdata.Title == null ? null : <div className='type5'>{itemdata.Title}</div>}
                      {itemdata.Description == null ? null : <p>{itemdata.Description}</p>}
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </div>

          <div className='services-detail-experience-slider_img'>
            <div className='services-detail-experience-slider_img_item'></div>
            {userDetails?.data.attributes.services_detail_experience.data.attributes.Images.map((imgdata: any) => (
              <img
                key={imgdata.id}
                src={strapi.strapihost + imgdata.Image.data.attributes.url}
                alt='sun-img'
                className={imgdata.class.replaceAll("_", "-")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className='services-detail-experience'>
      <div className='services-detail-experience-title container'>
        <h5>{userDetails?.data.attributes.services_detail_experience.data.attributes.MainTitle.Title}</h5>
        <RichText
          htmlContent={userDetails?.data.attributes.services_detail_experience.data.attributes.MainTitle.Description}
        ></RichText>
      </div>

      <div className='services-detail-experience-slider'>
        <div className='services-detail-experience-slider_content'>
          <div className='container'>
            {userDetails?.data.attributes.services_detail_experience.data.attributes.Description.map(
              (itemdata: any) => (
                <React.Fragment key={itemdata.id}>
                  <div className='type5'>{itemdata.Title}</div>
                  <p>{itemdata.Description}</p>
                </React.Fragment>
              )
            )}
          </div>
        </div>

        <div className='services-detail-experience-slider_img'>
          {userDetails?.data.attributes.services_detail_experience.data.attributes.Images.map((imgdata: any) => (
            <img
              key={imgdata.id}
              src={strapi.strapihost + imgdata.Image.data.attributes.url}
              alt='sun-img'
              className={imgdata.class.replaceAll("_", "-")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
