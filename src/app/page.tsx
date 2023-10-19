"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import CTA from "@/Components/CTA/CTA";
import strapi from "../Configurations/Config.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BANNER_NAV_QUERY,
  CAROUSEL,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FORM_TITLE_QUERY,
  HOME_SLIDER,
  LATEST_NEWS,
  RICHTEXT_QUERY,
  VERTICAL_SLIDER,
} from "../Configurations/CommonQuery.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import RichText from "@/Components/Common.jsx";
import LatestNews from "@/Components/LatestNews/LatestNews";
import axios, { AxiosRequestConfig } from "axios";
import XComponent from "@/Components/X-component/xComponent";
import Email from "@/Components/Email/Email";
import ContactForm from "./contact-us/Components/ContactForm";
import BannerNav from "@/Components/Banner/BannerNav";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import SliderComponent from "@/Components/Sliders/SliderComponent";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Home() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const pathname = usePathname();
  useEffect(() => {
    setTimeout(() => {
      /* Main navigation */
      let panelsContainer: any;

      let panelsSection = document.querySelector("#panels");
      //panelsContainer = document.querySelector("#panels-container"),
      panelsContainer = document.querySelector("#panels-container");
      let tween;

      /* Panels */
      const panels = gsap.utils.toArray("#panels-container .panel");
      tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#panels-container",
          toggleClass: { targets: ".tab-menu", className: "active" },
          pin: true,
          start: "top top",
          scrub: 1,
          // snap: {
          //   snapTo: 1 / (panels.length - 1),
          //   inertia: false,
          //   duration: { min: 0.1, max: 0.1 },
          // },
          end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
        },
      });
    }, 2000);
  }, []);

  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: CAROUSEL,
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
    setTimeout(() => {
      const elements = document.getElementsByClassName("banner-js");
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

  return (
    <>
      <SEOData name={pathname} query={SEO("home")} />
      <section id="panels" className="slidePanles_Container">
        <div id="panels-container" style={{ width: "400%" }}>
          {userDetails?.data.attributes.carousel.data.attributes.Carousel.map(
            (item: any) => (
              <article
                id={item.ArticleId.replaceAll("_", "-")}
                className="panel full-screen"
                key={item.id}
              >
                <div className="horizontal-scroll-section">
                  <div className="scene">
                    <div className="horizontal-scroll-section__content-wrapper wrapper">
                      <div
                        className="horizontal-scroll-section__content-section banner-js"
                        data-img-src={
                          strapi.strapihost +
                          item.DesktopImg.data.attributes.url
                        }
                      >
                        <div className="container">
                          <div className="banner-main">
                            <div className="banner-left">
                              <h1 className="d-none">
                                Digital Experience Solution
                              </h1>

                              <RichText
                                htmlContent={item.Description}
                              ></RichText>

                              <RichText htmlContent={item.Body}></RichText>

                              {item.Links[0].href == null ? (
                                ""
                              ) : (
                                <a
                                  href={item.Links[0].href}
                                  className="btn-defualt"
                                >
                                  {item.Links[0].label}
                                </a>
                              )}
                            </div>

                            <div className="banner-right mobile-banner-right">
                              <img
                                src={
                                  strapi.strapihost +
                                  item.MobileImg.data[0].attributes.url
                                }
                                alt="banner-mobile1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
        <BannerNav name={pathname} query={BANNER_NAV_QUERY("home")} />
      </section>
      <XComponent />
      <SliderVertical name={pathname} query={VERTICAL_SLIDER("home")} />
      <section className="navigate-component">
        <div className="">
          <h5>Navigate our website</h5>

          <div className="navigate-main">
            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <a href="contentful-cms-services" className="fadeout-images">
                <Image
                  src={
                    strapi.strapihost +
                    "/uploads/contentful_text_cff22eda10.svg"
                  }
                  width={0}
                  height={0}
                  alt="contentful-text"
                  className="circle"
                />
              </a>
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <a href="strapi-cms-services" className="fadeout-images">
                <Image
                  src={
                    strapi.strapihost + "/uploads/strapi_text_2c75e0c375.svg"
                  }
                  width={0}
                  height={0}
                  alt="strapi-text"
                  className="circle"
                />
              </a>
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <a href="umbraco-development-service" className="fadeout-images">
                <Image
                  src={strapi.strapihost + "/uploads/umbraco_3581870810.svg"}
                  width={0}
                  height={0}
                  alt="umbraco"
                  className="circle"
                />
              </a>
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <a href="virto-commerce-services" className="fadeout-images">
                <Image
                  src={
                    strapi.strapihost +
                    "/uploads/virto_commerce_text_242e8d2f46.svg"
                  }
                  width={0}
                  height={0}
                  alt="virto-commerce-text"
                  className="circle"
                />
              </a>
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <a href="contentstack-cms-services" className="fadeout-images">
                <Image
                  src={
                    strapi.strapihost +
                    "/uploads/contentstack_text_97d7aafe5d.svg"
                  }
                  width={0}
                  height={0}
                  alt="contentstack-text"
                  className="circle"
                />
              </a>
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <a href="kentico-development-service" className="fadeout-images">
                <Image
                  src={strapi.strapihost + "/uploads/kentico_fb8eb67ef7.svg"}
                  width={0}
                  height={0}
                  alt="kentico"
                  className="circle"
                />
              </a>
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>

            <div className="navigate-items">
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
              <Image
                src={strapi.strapihost + "/uploads/add_XP_logo_2d9bf8ee4f.svg"}
                width={0}
                height={0}
                alt="logo"
                className="circle"
              />
            </div>
          </div>
        </div>
      </section>

      <CTA name={pathname} query={CTA_QUERY("home")} />
      <SliderComponent name={pathname} query={HOME_SLIDER("home")} />
      <Email name={pathname} query={FORM_TITLE_QUERY("home")} />
      <LatestNews name={pathname} query={LATEST_NEWS("home")} />
      <ContactForm name={pathname} query={CONTACT_FORM_TITLE_QUERY("home")} />
      {/* <RichText
        htmlContent={
          userDetails?.data.attributes.richtext.data.attributes.Richtext
            .Description
        }
      ></RichText> */}
    </>
  );
}
