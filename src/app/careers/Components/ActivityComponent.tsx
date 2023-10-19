"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import LightGallery from "lightgallery/react";
import RichText from "@/Components/Common";
export default function ActivityComponent(props: any) {
  const [userDetails, setUserDetails] = useState<UserData>();
  const onBeforeSlide = (detail: { index: any; prevIndex: any }) => {
    const { index, prevIndex } = detail;
  };
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };
  let leftdata,
    rightfirstdata,
    rightseconddata = 0;
  function leftdatacount(i: any) {
    leftdata = i;
  }
  function rightfirstcount(i: any) {
    rightfirstdata = i;
  }
  function rightsecondcount(i: any) {
    rightseconddata = i;
  }
  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.career);
      console.log("response data = ", response.data.data.career);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='activity-component' id='activity-component'>
      <div className='container'>
        <span className='tag-line'>{userDetails?.data.attributes.gallrays.data[0].attributes.MainTitle.Title}</span>
        <h5>{userDetails?.data.attributes.gallrays.data[0].attributes.MainTitle.SubTitle}</h5>
        <div className='activty-main'>
          <div className='acticity-left'>
            <LightGallery elementClassNames='activity-image custom-wrapper-class' onBeforeSlide={onBeforeSlide}>
              {userDetails?.data.attributes.gallrays.data[0].attributes.LeftImages[0].Images.data.map(
                (leftimg: any, index: any) => {
                  leftdatacount(index);
                  return (
                    <a href={strapi.strapihost + leftimg.attributes.url} key={leftimg.id}>
                      <img alt='img1' src={strapi.strapihost + leftimg.attributes.url} />
                    </a>
                  );
                }
              )}
            </LightGallery>

            <div className='activity-desc'>
              <h6>{userDetails?.data.attributes.gallrays.data[0].attributes.LeftSection.Title}</h6>

              <RichText
                htmlContent={userDetails?.data.attributes.gallrays.data[0].attributes.LeftSection.Description}
              ></RichText>
            </div>

            <div className='photos-number'>
              <div className='photos-number-total'>{leftdata}</div>
              <div className='photos-number-text'>More</div>
            </div>
          </div>
          <div className='acticity-right'>
            <div className='activity-box'>
              <LightGallery elementClassNames='ac-box-left activity-image' onBeforeSlide={onBeforeSlide}>
                {userDetails?.data.attributes.gallrays.data[0].attributes.RightFirstImages[0].Images.data.map(
                  (rightfirstimg: any, index: any) => {
                    rightfirstcount(index);
                    return (
                      <a href={strapi.strapihost + rightfirstimg.attributes.url} key={rightfirstimg.id}>
                        <img alt='img1' src={strapi.strapihost + rightfirstimg.attributes.url} />
                      </a>
                    );
                  }
                )}
              </LightGallery>
              <div className='photos-number'>
                <div className='photos-number-total'>{rightfirstdata}</div>
                <div className='photos-number-text'>More</div>
              </div>
              <div className='ac-box-right'>
                <h6>{userDetails?.data.attributes.gallrays.data[0].attributes.RightFirst.Title}</h6>
                <RichText
                  htmlContent={userDetails?.data.attributes.gallrays.data[0].attributes.RightFirst.Description}
                ></RichText>
              </div>
            </div>
            <div className='activity-box'>
              <LightGallery elementClassNames='ac-box-left activity-image' onBeforeSlide={onBeforeSlide}>
                {userDetails?.data.attributes.gallrays.data[0].attributes.RightSecImage[0].Images.data.map(
                  (rightsecimg: any, index: any) => {
                    rightsecondcount(index);
                    return (
                      <a href={strapi.strapihost + rightsecimg.attributes.url} key={rightsecimg.id}>
                        <img alt='img1' src={strapi.strapihost + rightsecimg.attributes.url} />
                      </a>
                    );
                  }
                )}
              </LightGallery>
              <div className='photos-number'>
                <div className='photos-number-total'>{rightseconddata}</div>
                <div className='photos-number-text'>More</div>
              </div>
              <div className='ac-box-right'>
                <h6>{userDetails?.data.attributes.gallrays.data[0].attributes.RightSec.Title}</h6>
                <RichText
                  htmlContent={userDetails?.data.attributes.gallrays.data[0].attributes.RightSec.Description}
                ></RichText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
