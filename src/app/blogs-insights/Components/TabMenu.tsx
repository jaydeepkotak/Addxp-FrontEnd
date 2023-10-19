"use client";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import strapi from "../../../Configurations/Config.json";
import axios, { AxiosRequestConfig } from "axios";
import { BLOG_LISTING } from "@/Configurations/CommonQuery";
import Link from "next/link";
import moment from "moment";
function TabMenu() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: BLOG_LISTING,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.blogListings);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="banner-tab">
      <div className="container">
        <Tabs
          defaultActiveKey="All Blogs"
          id="uncontrolled-tab-example"
          className=""
        >
          {userDetails?.data.map((item: any) => (
            <Tab
              eventKey={item.attributes.EventTitle.replaceAll("_", " ")}
              title={item.attributes.EventTitle.replaceAll("_", " ")}
              className=""
              key={item.id}
            >
              <section className="latest-news blog-listing-content">
                <div className="container">
                  <div className="row">
                    {item.attributes.blogs.data.map((childblogs: any) => (
                      <div
                        className="col-md-4 blog-title-all-blogs blog-title-content-experience"
                        key={childblogs.id}
                      >
                        <Link
                          href={`/blogs-insights/${childblogs.attributes.Blogs.Links.href}`}
                          //as={`/blogs-insights/${childblogs.attributes.Blogs.Links.href}`}
                          className="latest-box"
                        >
                          <figure>
                            <img
                              src={
                                strapi.strapihost +
                                childblogs.attributes.Blogs.image.data
                                  .attributes.url
                              }
                              alt={
                                childblogs.attributes.Blogs.image.data
                                  .attributes.alternativeText
                              }
                            />
                          </figure>
                          <div className="latest-desc">
                            <div className="label">
                              {childblogs.attributes.Blogs.tagLabel}
                            </div>
                            <h6 className="large">
                              {childblogs.attributes.Blogs.Title}
                            </h6>
                            <ul>
                              <li>
                                {moment(
                                  childblogs.attributes.Blogs.Date
                                ).format("DD MMMM YYYY")}
                              </li>
                              <li>{childblogs.attributes.Blogs.Creator}</li>
                            </ul>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default TabMenu;
