"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import strapi from "../../Configurations/Config.json";
import axios, { AxiosRequestConfig } from "axios";
import RichText from "../Common";
interface SlideProps {
  content: string; // Replace 'string' with the actual type of the 'content' prop
}
interface SliderDataType {
  content: string;
  // other properties if available
}
const Slide: React.FC<SlideProps> = ({ content }) => (
  <div className="slide">{content}</div>
);
//const Slide = ({ content }) => <div className="slide">{content}</div>;
function SliderComponent(props: any) {
  const [userDetails, setUserDetails] = useState<UserData>();
  const [sliderData, setSliderData] = useState<SliderDataType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };

  async function fetchdata() {
    try {
      if (props.name == "/") {
        const response = await axios(config);
        setUserDetails(response.data.data.home);

        const contentArray =
          response.data.data.home.data.attributes.home_slider.data.attributes.Details.map(
            (item: any) => {
              return {
                content: (
                  <div className="slider-main">
                    <div className="slider-left">
                      <h4 className="xl">{item.Title}</h4>
                      <RichText htmlContent={item.Description}></RichText>
                    </div>
                    <div className="slider-right">
                      <div className="slider-desc">
                        <img
                          src={
                            strapi.strapihost + item.Images.data.attributes.url
                          }
                          alt="contentful-slider-image"
                        />
                      </div>
                    </div>
                  </div>
                ),
              };
            }
          );
        setSliderData(contentArray);
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  var settings = {
    infinite: !0,
    dots: !1,
    arrows: !0,
    autoplay: !1,
    autoplaySpeed: 3e3,
    fade: !0,
    fadeSpeed: 1e3,
    beforeChange: (current: any, next: React.SetStateAction<number>) => {
      setCurrentSlide(next);
    },
  };

  return (
    <div id="slider-component" className="slider-component">
      <div className="container">
        <div className="left-section">
          <h5>
            {
              userDetails?.data.attributes.home_slider.data.attributes.MainTitle
                .Title
            }
          </h5>
          <RichText
            htmlContent={
              userDetails?.data.attributes.home_slider.data.attributes.MainTitle
                .Description
            }
          ></RichText>
        </div>
        {sliderData ? (
          <>
            <Slider className="slider" {...settings}>
              {sliderData?.map((slide: any, index: any) => (
                <Slide key={`slide-${index}`} content={slide.content} />
              ))}
            </Slider>
            <div className="slide-count">
              {currentSlide + 1}/{sliderData?.length}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SliderComponent;
