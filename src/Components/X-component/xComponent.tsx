import React, { useEffect, useRef, useState } from "react";
var $ = require("jquery");
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import strapi from "../../Configurations/Config.json";

import dynamic from "next/dynamic";
import axios, { AxiosRequestConfig } from "axios";
import { XCOMPONENT } from "@/Configurations/CommonQuery";
import RichText from "../Common";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const Responsive = {
  0: {
    items: 1,
    margin: 1,
  },
  1024: {
    items: 1,
    margin: 1,
  },
};

function XComponent() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: XCOMPONENT,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.home);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  const [selecteditem, setSelectedItem] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);

  const HandleCurrentClass = (e: any, index: number) => {
    e.preventDefault();
    setSelectedItem(index);
  };
  useEffect(() => {
    setTimeout(() => {
      const totalSlidesCount = document.querySelectorAll(
        ".owl-theme.X__Component .item"
      ).length;
      setTotalSlides(totalSlidesCount);
    }, 1500);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      // Initialize the first Owl Carousel
      const firstCarousel = $("#sync1");

      firstCarousel.on("changed.owl.carousel", (event: any) => {
        // event.item is the new selected item
        setSelectedItem(event.item.index);
      });
    }, 1500);
  }, []);
  useEffect(() => {
    setCurrentItem(selecteditem);
  }, [selecteditem]);
  return (
    <>
      <section className="x-component">
        <div className="container">
          <div className="X-title">
            <h5>
              {
                userDetails?.data.attributes.xcomponent.data.attributes
                  .MainTitle
              }
            </h5>
          </div>
          <div className="slider-main">
            <OwlCarousel
              key={currentItem}
              dots={false}
              id="sync2"
              className="owl-theme"
              responsive={{
                0: {
                  items: 4,
                },
                1024: {
                  items: 4,
                },
              }}
              startPosition={selecteditem}
            >
              <div className="item" onClick={(e) => HandleCurrentClass(e, 0)}>
                <div className={`box1 ${currentItem === 0 ? "current" : ""}`}>
                  <small className="text">
                    {
                      userDetails?.data.attributes.xcomponent.data.attributes
                        .XcomponentData[0].Title
                    }
                  </small>
                  <div className="hover-desc">
                    <img
                      src={
                        strapi.strapihost + "/uploads/line_image_052488c570.png"
                      }
                      alt="line-image"
                      className="image-desc"
                    />
                    <img
                      src={
                        strapi.strapihost + "/uploads/line_hover_d2e495a895.png"
                      }
                      alt="line-hover"
                      className="image-hover"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_active_88be5fc41e.png"
                      }
                      alt="line-active"
                      className="image-active"
                    />
                    <div className="line-image">
                      <img
                        src={
                          strapi.strapihost + "/uploads/line1_c49b889a41.svg"
                        }
                        alt="line1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" onClick={(e) => HandleCurrentClass(e, 1)}>
                <div className={`box2 ${currentItem === 1 ? "current" : ""}`}>
                  <small className="text">
                    {
                      userDetails?.data.attributes.xcomponent.data.attributes
                        .XcomponentData[1].Title
                    }
                  </small>
                  <div className="hover-desc">
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_image2_e0fad7377b.png"
                      }
                      alt="line-image2"
                      className="image-desc"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_hover2_be68f5f4b6.png"
                      }
                      alt="line-hover2"
                      className="image-hover"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_active2_847813ca4d.png"
                      }
                      alt="line-active2"
                      className="image-active"
                    />
                    <div className="line-image">
                      <img
                        src={
                          strapi.strapihost + "/uploads/line2_1e67d7d833.svg"
                        }
                        alt="line2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" onClick={(e) => HandleCurrentClass(e, 2)}>
                <div className={`box3 ${currentItem === 2 ? "current" : ""}`}>
                  <small className="text">
                    {
                      userDetails?.data.attributes.xcomponent.data.attributes
                        .XcomponentData[2].Title
                    }
                  </small>
                  <div className="hover-desc">
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_image4_387d7be47e.png"
                      }
                      alt="line-image4"
                      className="image-desc"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_hover4_0fd49adcf0.png"
                      }
                      alt="line-hover4"
                      className="image-hover"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_active4_062028b9a9.png"
                      }
                      alt="line-active4"
                      className="image-active"
                    />
                    <div className="line-image">
                      <img
                        src={
                          strapi.strapihost + "/uploads/line4_4db72834f1.svg"
                        }
                        alt="line4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" onClick={(e) => HandleCurrentClass(e, 3)}>
                <div className={`box4 ${currentItem === 3 ? "current" : ""}`}>
                  <small className="text">
                    {
                      userDetails?.data.attributes.xcomponent.data.attributes
                        .XcomponentData[3].Title
                    }
                  </small>
                  <div className="hover-desc">
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_image3_e09633ad17.png"
                      }
                      alt="line-image3"
                      className="image-desc"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_hover3_b45d6aa44f.png"
                      }
                      alt="line-hover3"
                      className="image-hover"
                    />
                    <img
                      src={
                        strapi.strapihost +
                        "/uploads/line_active3_2294acda1e.png"
                      }
                      alt="line-active3"
                      className="image-active"
                    />
                    <div className="line-image">
                      <img
                        src={
                          strapi.strapihost + "/uploads/line4_4db72834f1.svg"
                        }
                        alt="line3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
            <h5 className="mobile-title">
              {
                userDetails?.data.attributes.xcomponent.data.attributes
                  .MainTitle
              }
            </h5>

            <OwlCarousel
              //   ref={eRef}
              id="sync1"
              className="owl-theme X__Component"
              responsive={Responsive}
              nav={true}
              loop={false}
              dots={false}
              items={1}
              navText={[
                '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
                '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>',
              ]}
              startPosition={selecteditem}
            >
              {userDetails?.data.attributes.xcomponent.data.attributes.XcomponentData.map(
                (item: any) => (
                  <div className="item " key={item.id}>
                    <span className="large">{item.Title}</span>
                    <RichText htmlContent={item.Description}></RichText>
                  </div>
                )
              )}
            </OwlCarousel>

            <div className="slider-counter">
              {selecteditem + 1}/{totalSlides}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default XComponent;
