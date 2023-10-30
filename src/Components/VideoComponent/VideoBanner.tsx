"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import moment from "moment";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
export default function VideoBanner(props: any) {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };
  const [videoUrl, setVideoUrl] = useState();
  async function fetchdata() {
    try {
      if (props.name == "/commerce-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.commerceExperience);
        setVideoUrl(
          response.data.data.commerceExperience.data.attributes.video_banner.data.attributes.VideoMain.VideoUrl
        );
      }
      if (props.name == "/content-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentExperience);
        setVideoUrl(
          response.data.data.contentExperience.data.attributes.video_banner.data.attributes.VideoMain.VideoUrl
        );
      }
      if (props.name == "/user-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.userExperience);
        setVideoUrl(response.data.data.userExperience.data.attributes.video_banner.data.attributes.VideoMain.VideoUrl);
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }

  useEffect(() => {
    fetchdata();
  }, [props.name]);

  return (
    <section className='services-detail-hero'>
      {videoUrl ? (
        <video loop autoPlay={true} preload='auto' muted playsInline>
          <source src={videoUrl} type='video/mp4' />
        </video>
      ) : null}

      <div className='container'>
        <div className='services-detail-hero_content'>
          <div className='services-detail-hero_content_title'>
            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.video_banner.data.attributes.VideoMain.TitleImage.data.attributes.url
              }
              alt={
                userDetails?.data.attributes.video_banner.data.attributes.VideoMain.TitleImage.data.attributes
                  .alternativeText
              }
            />

            <Link
              href={`${userDetails?.data.attributes.video_banner.data.attributes.VideoMain.MainLink.href}`}
              className='title-smalltext'
            >
              <img
                src='https://d1ousucuxrlllk.cloudfront.net/src/images/title-small-arrow.png'
                alt='title-small-arrow'
              />
              {userDetails?.data.attributes.video_banner.data.attributes.VideoMain.MainLink.label}
            </Link>
          </div>
          <RichText
            htmlContent={userDetails?.data.attributes.video_banner.data.attributes.VideoMain.Description}
          ></RichText>
        </div>

        <div className='services-detail-hero_highlights'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='services-detail-hero_highlights_experts'>
                <div className='experts_btncontent'>
                  <div className='btn-tag-wrapper'>
                    <span className='btn-tag'>
                      {userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.Title}
                    </span>
                  </div>
                  <p>{userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.Description}</p>
                </div>

                <div className='experts-count-chat'>
                  <div className='experts-count-chat_number'>
                    <span className='number'>
                      {userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.Number}
                    </span>
                    <span className='text'>
                      <RichText
                        htmlContent={userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.Text}
                      ></RichText>
                    </span>
                  </div>

                  <div className='experts-count-chat_img'>
                    <img
                      src={
                        strapi.strapihost +
                        userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.TagImage.data.attributes.url
                      }
                      alt='expert-chat-multiple'
                    />
                    <Link
                      href={`${userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.Link.href}`}
                      className='icon-rocket'
                    >
                      {userDetails?.data.attributes.video_banner.data.attributes.VideoLeft.Link.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='services-detail-hero_highlights_itemlist'>
                {userDetails?.data.attributes.video_banner.data.attributes.VideoRight.map((itemright: any) => (
                  <div className='highlights_item' key={itemright.id}>
                    <div className='highlights_item_title'>{itemright.Title}</div>
                    <div className='highlights_item_date'>{moment(itemright.Date).format("DD MMMM YYYY")}</div>
                    <Link href={`/blogs-insights/${itemright.Link.href}`}>{itemright.Link.label}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
