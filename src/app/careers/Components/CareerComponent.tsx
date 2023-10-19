"use client";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import strapi from "../../../Configurations/Config.json";
import Tabs from "react-bootstrap/Tabs";

function CareerComponent(props: any) {
  const [userDetails, setUserDetails] = useState<UserData>();
  const [id, setId] = useState("");
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.career);
      setId("build-future-section");
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='career-component' id={id}>
      <div className='container'>
        <span className='tag-line'>Exciting Career Paths</span>
        <h5>Build your future with us!</h5>

        <div className='tabbing-main'>
          <Tabs defaultActiveKey='AllPositions' id='uncontrolled-tab-example' className='nav nav-tabs'>
            {userDetails?.data.attributes.positions.data.map((tabitem: any) =>
              tabitem.attributes.EventTitle == "AllPositions" ? (
                <Tab
                  eventKey={tabitem.attributes.EventTitle}
                  title={tabitem.attributes.EventTitle}
                  className='nav-link '
                  key={tabitem.id}
                >
                  <div className='accordion-body'>
                    <div className='row'>
                      {tabitem.attributes.positions.data.map((data: any) =>
                        data.attributes.Info.map((dataitem: any) => (
                          <div className='col-md-6' key={data.id}>
                            <div className='tab-box' key={dataitem.id}>
                              <div className='tab-box-top'>
                                <h6>{dataitem.LogoTitle}</h6>
                                <span className='x-icon'>
                                  <img
                                    src={strapi.strapihost + dataitem.Icon.data?.attributes.url}
                                    alt={dataitem.Icon.data?.attributes.alternativeText}
                                    className='icon-x'
                                  />
                                  <img
                                    src={strapi.strapihost + dataitem.HoverIcon.data?.attributes.url}
                                    alt={dataitem.HoverIcon.data?.attributes.alternativeText}
                                    className='icon-x-hover'
                                  />
                                </span>
                              </div>
                              <div className='tab-box-botom'>
                                <ul>
                                  {dataitem.TitleIcon.map((titleicn: any) => (
                                    <li key={titleicn.id}>
                                      <img
                                        src={strapi.strapihost + titleicn.Icon.data?.attributes.url}
                                        alt={titleicn.Icon.data?.attributes.alternativeText}
                                      />
                                      {titleicn.Title}
                                    </li>
                                  ))}
                                </ul>

                                <a href={dataitem.LogoLink?.href} className='arrow-right'>
                                  <img
                                    src={strapi.strapihost + dataitem.AerrowIcon.data?.attributes.url}
                                    alt={dataitem.AerrowIcon.data?.attributes.alternativeText}
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </Tab>
              ) : (
                <Tab
                  eventKey={tabitem.attributes.EventTitle}
                  title={tabitem.attributes.EventTitle}
                  className='nav-link '
                  key={tabitem.id}
                >
                  <div className='accordion-body'>
                    <div className='row'>
                      {tabitem.attributes.Info.map((dataitem: any) => (
                        <div className='col-md-6' key={dataitem.id}>
                          <a href={dataitem.LogoLink?.href}>
                            <div className='tab-box'>
                              <div className='tab-box-top'>
                                <h6>{dataitem.LogoTitle}</h6>
                                <span className='x-icon'>
                                  <img
                                    src={strapi.strapihost + dataitem.Icon.data?.attributes.url}
                                    alt={dataitem.Icon.data?.attributes.alternativeText}
                                    className='icon-x'
                                  />
                                  <img
                                    src={strapi.strapihost + dataitem.HoverIcon.data?.attributes.url}
                                    alt={dataitem.HoverIcon.data?.attributes.alternativeText}
                                    className='icon-x-hover'
                                  />
                                </span>
                              </div>
                              <div className='tab-box-botom'>
                                <ul>
                                  {dataitem.TitleIcon.map((titleicn: any) => (
                                    <li key={titleicn.id}>
                                      <img
                                        src={strapi.strapihost + titleicn.Icon.data?.attributes.url}
                                        alt={titleicn.Icon.data?.attributes.alternativeText}
                                      />
                                      {titleicn.Title}
                                    </li>
                                  ))}
                                </ul>

                                <span className='arrow-right'>
                                  <img
                                    src={strapi.strapihost + dataitem.AerrowIcon.data?.attributes.url}
                                    alt={dataitem.AerrowIcon.data?.attributes.alternativeText}
                                  />
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
              )
            )}
          </Tabs>
        </div>
        <div className='get-link'>
          Get to know us better!
          <a href={userDetails?.data.attributes.AboutLink.href}>{userDetails?.data.attributes.AboutLink.label}</a>
        </div>
      </div>
    </section>
  );
}

export default CareerComponent;
