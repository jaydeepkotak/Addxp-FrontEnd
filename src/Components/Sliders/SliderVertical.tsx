"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../../Configurations/Config.json";
import RichText from "../Common";

gsap.registerPlugin(ScrollTrigger);

function SliderVertical(props: any) {
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
      if (props.name == "/") {
        const response = await axios(config);
        setUserDetails(response.data.data.home);
      }
      if (props.name == "/hire-strapi-developer") {
        const response = await axios(config);
        setUserDetails(response.data.data.hireStrapiDeveloper);
      }
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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.defaults({ markers: false });
      const t = gsap.utils.toArray(".point");
      const e = gsap.utils.toArray(".indicator");
      const o = 100 * t.length;
      gsap.set(".indicators", { display: "flex" });

      const i = gsap.timeline({
        duration: t.length,
        scrollTrigger: {
          trigger: ".philosophie",
          start: "top center",
          end: `+=${o}%`,
          scrub: true,
          id: "points",
          markers: false,
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".philosophie .philosophie-slider",
          start: "top top",
          end: `+=${o}%`,
          scrub: true,
          pin: ".philosophie .philosophie-slider",
          pinSpacing: true,
          id: "pinning",
          markers: false,
        },
      });

      t.forEach(function (o: any, a: any) {
        gsap.set(o, { position: "absolute", top: 0 });
        e.forEach((element: any, index: any) => {
          i.to(element, { borderColor: "#E97777" }, index);
        });
        // i.to(e[a], { borderColor: "#E97777" }, a);
        i.from(o.querySelector(".slider-right"), { autoAlpha: 0 }, a);
        i.from(
          o.querySelector(".slider-left"),
          {
            color: "#313131",
            autoAlpha: 0,
            translateY: 200,
          },
          a
        );
        i.addLabel("position-" + a);
        if (a !== t.length - 1) {
          e.forEach((Element: any, index: any) => {
            i.to(Element, { borderColor: "#fff" }, index + 0.75);
          });
          // i.to(e[a], { borderColor: "#fff" }, a + 0.75);
          i.to(
            o.querySelector(".slider-left"),
            { autoAlpha: 0, translateY: -350 },
            a + 0.75
          );
          i.to(o.querySelector(".slider-right"), { autoAlpha: 0 }, a + 0.75);
        }
      });

      e.forEach(function (t: any, e: any) {
        t.addEventListener("click", function () {
          gsap.to(window, {
            duration: 0,
            scrollTo: i.scrollTrigger?.labelToScroll(`position-${e}`),
          });
        });
      });
    }, 4000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const indicatorsarry = document.getElementsByClassName("indicator");
      const indicators = Array.from(indicatorsarry);
      indicators?.forEach((indicator: any, t: any) => {
        const prevIndicator = indicators[t - 1];
        const nextIndicator = indicators[t + 1];

        if (indicator.style.borderColor === "rgb(233, 119, 119)") {
          if (t > 0) prevIndicator.classList.remove("scrolled");
          if (t < indicators.length)
            nextIndicator?.classList.remove("scrolled");

          t = indicators.length;
          indicators[0].classList.remove("scrolled");
          indicator.classList.add("scrolled");

          if (indicators.length === 4 && t < 4)
            nextIndicator?.classList.remove("scrolled");
        }
      });
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section className="slider-verticle">
      <div className="container">
        <section className="philosophie">
          <div className="philosophie-slider">
            <div className="slider-top-desc">
              <h5>
                {
                  userDetails?.data.attributes.verticle_slider.data.attributes
                    .MainTitle.Title
                }
              </h5>
              <RichText
                htmlContent={
                  userDetails?.data.attributes.verticle_slider.data.attributes
                    .MainTitle.Description
                }
              ></RichText>
            </div>
            <div className="wrapper">
              <div className="indicators">
                {userDetails?.data.attributes.verticle_slider.data.attributes.VerticalSlider.map(
                  (item: any) => (
                    <div className="indicator" key={item.id}>
                      {item.TabTitle}
                    </div>
                  )
                )}
              </div>
              {userDetails?.data.attributes.verticle_slider.data.attributes.VerticalSlider.map(
                (subitem: any) => (
                  <div className="point" key={subitem.id}>
                    <div className="slider-main">
                      <div className="slider-left">
                        <div className="slider-v-desc">
                          <RichText htmlContent={subitem.Title}></RichText>
                          <RichText
                            htmlContent={subitem.Description}
                          ></RichText>
                        </div>
                      </div>
                      <div className="slider-right">
                        <img
                          src={
                            strapi.strapihost +
                            subitem.Images.data.attributes.url
                          }
                          alt={subitem.Images.data.attributes.alternativeText}
                        />
                        {subitem.SubTitle == null ||
                        subitem.SubDescription == null ? (
                          ""
                        ) : (
                          <div className="figcaption">
                            <h6>{subitem.SubTitle}</h6>
                            <RichText
                              htmlContent={subitem.SubDescription}
                            ></RichText>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default SliderVertical;
