"use client";
import React, { useEffect, useRef, useState } from "react";
import strapi from "../../../Configurations/Config.json";
var $ = require("jquery");
// if (typeof window !== "undefined") {
//   window.$ = window.jQuery = require("jquery");
// }
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
import axios, { AxiosRequestConfig } from "axios";
import { HIRE_TAB_QUERY } from "../Query/HireQuery";
import RichText from "@/Components/Common";
import Link from "next/link";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

function OwlTabSlider() {
  const [selecteditem, setSelectedItem] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [userDetails, setUserDetails] = useState<UserData>();
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);

  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: HIRE_TAB_QUERY,
    },
  };
  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.hireStrapiDeveloper);
      setIsCarouselLoading(false);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleCurrentClass = (e: any, index: number) => {
    setSelectedItem(index);
  };
  useEffect(() => {
    setTimeout(() => {
      const totalSlidesCount = document.querySelectorAll(".owl-theme.owl-button-slide-1 .item").length;
      setTotalSlides(totalSlidesCount);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const firstCarousel = document.getElementById("sync1");
      if (firstCarousel) {
        const owlInstance = $(firstCarousel).data("owlCarousel");

        if (owlInstance) {
          owlInstance.reinit({
            onChanged: function (event: any) {
              // event.item is the new selected item
              setSelectedItem(event.item.index);
            },
          });
        }
      }
    }, 1500);
  }, []);
  return (
    <>
      {isCarouselLoading === false ? (
        <section className='why-hire-section'>
          <div className='container'>
            <div className='hire-looking-box'>
              <div className='hire-looking-top'>
                <h5>{userDetails?.data.attributes.hire_tab_component.data.attributes.TitleData.Title}</h5>

                <RichText
                  htmlContent={userDetails?.data.attributes.hire_tab_component.data.attributes.TitleData.Description}
                ></RichText>
              </div>

              <OwlCarousel
                //   ref={tRef}
                key={selecteditem}
                dots={false}
                id='sync2'
                className='owl-theme owl-button-slide-1'
                items={1}
                startPosition={selecteditem}
              >
                {userDetails?.data.attributes.hire_tab_component.data.attributes.TabData.map(
                  (titledata: any, index: any) => (
                    <div className={`item`} onClick={(e) => handleCurrentClass(e, index)} key={titledata.id}>
                      <span className={index === selecteditem ? "tab-owl-button active" : "tab-owl-button"}>
                        {titledata.Title}
                      </span>
                    </div>
                  )
                )}
              </OwlCarousel>

              <div className='hire-looking-desc'>
                <OwlCarousel
                  id='sync1'
                  key={selecteditem}
                  className='owl-theme hire-looking-slider'
                  nav={true}
                  loop={false}
                  dots={false}
                  items={1}
                  startPosition={selecteditem}
                  onChanged={(event: any) => {
                    setSelectedItem(event.item.index);
                  }}
                >
                  {userDetails?.data.attributes.hire_tab_component.data.attributes.TabData.map((item: any) => (
                    <div className='hire-slider key' key={item.id}>
                      <div className='hire-slider-left'>
                        <div className='hire-slider-desc'>
                          <h5>{item.Title}</h5>

                          <RichText htmlContent={item.Description}></RichText>

                          <Link href={`${item.Link.href}`} className='btn-defualt'>
                            {item.Link.label}
                          </Link>
                        </div>
                      </div>

                      <div className='hire-slider-right'>
                        <img src={strapi.strapihost + item.Image.data.attributes.url} />
                      </div>
                    </div>
                  ))}
                </OwlCarousel>

                <div className='slider-counter'>
                  {selecteditem + 1}/{totalSlides}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default OwlTabSlider;
