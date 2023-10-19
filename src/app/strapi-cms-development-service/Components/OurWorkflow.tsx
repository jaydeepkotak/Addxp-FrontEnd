"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common";

gsap.registerPlugin(ScrollTrigger);

function OurWorkflow(props: any) {
  const [userDetails, setUserDetails] = useState<UserData>();

  useEffect(() => {
    let t = document.querySelector(".new_timeline.horizontal-slider-main");
    function e(t: any) {
      t?.addEventListener("wheel", (e: any) => {
        let o = e.deltaY;
        0 === t.scrollLeft && o < 0
          ? window.scrollBy({ top: -window.innerHeight })
          : t.scrollLeft === t.scrollWidth - t.clientWidth && o > 0
          ? window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          : ((t.scrollLeft += o), e.preventDefault());
      });
    }
    window.addEventListener("load", function () {
      e(t);
    }),
      e(t);
  }, []);

  const sectionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    // Function to handle intersection changes
    const handleIntersection = (entries: any) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.8, // Adjust this threshold as needed
    });

    // Observe the section element
    if (section) {
      observer.observe(section);
    }

    // Cleanup by disconnecting the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };

  async function fetchdata() {
    try {
      if (props.name == "/strapi-cms-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiDevelopment);
      }
      if (props.name == "/strapi-cms-consultation-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiConsultation);
      }
      if (props.name == "/strapi-support-maintenance-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiSupportAndMaintenance);
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
    <section
      className={`horizontal-strapi-cms development-process-component position-relative`}
    >
      <div
        className={`sticky-section ${isSticky ? "is-sticky" : ""}`}
        ref={sectionRef}
      >
        <div className="container">
          <span className="tag-line">
            <RichText
              htmlContent={
                userDetails?.data.attributes.work_flow.data.attributes.Main
                  .Description
              }
            ></RichText>
          </span>
          <h5>
            {userDetails?.data.attributes.work_flow.data.attributes.Main.Title}
          </h5>
          <div className="development-box">
            <ul>
              {userDetails?.data.attributes.work_flow.data.attributes.Workflowdata.map(
                (item: any) => (
                  <li key={item.id}>
                    <p className="regular">{item.Title}</p>
                    {item.LongTitle}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="new_timeline horizontal-slider-main">
          <div className="container testContainer">
            <ol>
              {userDetails?.data.attributes.work_flow.data.attributes.Workflowdata.map(
                (item: any) => (
                  <li key={item.id}>
                    <div className="box-desc">
                      <h3>{item.Title}</h3>
                      <p>{item.LongTitle}</p>
                    </div>
                  </li>
                )
              )}
              <li></li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurWorkflow;
