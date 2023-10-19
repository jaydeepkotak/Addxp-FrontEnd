"use client";
import React, { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import { useParams, usePathname } from "next/navigation";
import axios, { AxiosRequestConfig, all } from "axios";
import RichText from "@/Components/Common";
import { BLOGS_DETAILS } from "@/Configurations/CommonQuery";
import Link from "next/link";
import moment from "moment";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

function SlugPage() {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserData>();
  const searchParams = useParams();
  const parameters = searchParams.blogdetails;
  const config: AxiosRequestConfig = {
    method: "GET",
    url: strapi.strapihost + BLOGS_DETAILS(parameters),
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data);
    } catch (err) {
    } finally {
    }
  }
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    fetchdata();
    document.body.classList.add("blog-detail-body");

    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Check if the element with the id "progress" exists
      const progressElement = document.getElementById("progress");

      if (progressElement) {
        const scrollPercentage =
          (scrollTop / (documentHeight - windowHeight)) * 100;

        // Set the style only if the element exists
        progressElement.style.width = scrollPercentage + "%";
      }
    };

    if (document.querySelector("#progress")) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (document.querySelector("#progress")) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <SEOData name={parameters} />
      <div id="progress" style={{ width: "0" }}></div>
      {userDetails?.data.map((item: any) => (
        <>
          <section className="blog-detail-banner">
            <div className="container">
              <div className="blog-detail-main">
                <div className="blog-detail-left">
                  <div className="label">{item.attributes.Blogs.tagLabel}</div>
                  <h1 className="d-none">{item.attributes.Blogs.Title}</h1>
                  <h5>{item.attributes.Blogs.Title}</h5>
                  <RichText
                    htmlContent={item.attributes.HeadDescription}
                  ></RichText>
                  <div className="blog-detail-bottom">
                    <img
                      src={
                        strapi.strapihost +
                        item.attributes.Blogs.Companylogo.data.attributes.url
                      }
                      alt={
                        item.attributes.Blogs.Companylogo.data.attributes
                          .alternativeText
                      }
                      className="blog-detail-desc"
                    />
                    <div className="blog-detail-desc">
                      <small>{item.attributes.Blogs.Creator}</small>

                      <span className="date">
                        {moment(item.attributes.Blogs.Date).format(
                          "DD MMMM YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="blog-detail-right">
                  <img
                    src={
                      strapi.strapihost +
                      item.attributes.Blogs.image.data.attributes.url
                    }
                    alt={
                      item.attributes.Blogs.image.data.attributes
                        .alternativeText
                    }
                    className="blog-detail-desc"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="blog-detail-content">
            <div className="container">
              <div className="blog-content-main">
                <div className="social-icon-sticky">
                  <ul className="blog-social-icon">
                    <li
                      className={`share-icon ${isOpen ? "open" : ""}`}
                      onClick={handleButtonClick}
                    >
                      <img
                        src={
                          item.attributes.social_icons.data[0].attributes
                            .SocialIcons.Icons.data.attributes.url
                        }
                        alt="social-open"
                        className={`${item.attributes.social_icons.data[0].attributes.SocialIcons.ClassName.replaceAll(
                          "_",
                          "-"
                        )} ${isOpen ? "" : "d-none"}`}
                        style={{
                          left: isOpen ? "68px" : "10px",
                          top: isOpen ? "38px" : "0",
                        }}
                      />
                      <img
                        src={
                          item.attributes.social_icons.data[0].attributes
                            .SocialIcons.Icons.data.attributes.url
                        }
                        alt="social-close"
                        className={`social-close ${isOpen ? "d-block" : ""}`}
                      />
                    </li>
                    {item.attributes.social_icons.data.map(
                      (socialitem: any) => (
                        <li key={socialitem.id}>
                          <Link
                            href={socialitem.attributes.SocialIcons.Links.href}
                            className={socialitem.attributes.SocialIcons.ClassName.replaceAll(
                              "_",
                              "-"
                            )}
                          >
                            <img
                              src={
                                strapi.strapihost +
                                socialitem.attributes.SocialIcons.Icons.data
                                  .attributes.url
                              }
                              alt={
                                socialitem.attributes.SocialIcons.Icons.data
                                  .attributes.alternativeText
                              }
                            />
                            <img
                              src={
                                strapi.strapihost +
                                socialitem.attributes.SocialIcons.HoverIcon.data
                                  .attributes.url
                              }
                              alt={
                                socialitem.attributes.SocialIcons.HoverIcon.data
                                  .attributes.alternativeText
                              }
                              className="hover"
                            />
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="blog-detail-summary">
                  <RichText
                    htmlContent={item.attributes.AboutDescription}
                  ></RichText>

                  {item.attributes.BlogBody.map((datavalue: any) => (
                    <>
                      <RichText
                        htmlContent={datavalue.IntroductionTitle}
                        key={datavalue.id}
                      ></RichText>

                      <RichText htmlContent={datavalue.Steps}></RichText>
                      {datavalue.Images.data == null ? (
                        ""
                      ) : (
                        <img
                          src={
                            strapi.strapihost +
                            datavalue.Images.data.attributes.url
                          }
                          alt="umbraco-12-set-up-and-installation-guide-1"
                        ></img>
                      )}
                      <RichText htmlContent={datavalue.Richtext}></RichText>
                    </>
                  ))}

                  <RichText htmlContent={item.attributes.Conclusion}></RichText>
                </div>
              </div>
            </div>
          </section>
        </>
      ))}

      {userDetails?.data.map((item: any) =>
        item.attributes.Similar_blog.data.map((checkdata: any, index: any) =>
          checkdata.attributes.Blogs == null ? (
            "Good bye forever"
          ) : index <= 0 ? (
            <section
              className="latest-news service-component-2"
              key={checkdata.id}
            >
              <div className="container">
                <div className="latest-top">
                  <h5>Similar stories</h5>
                  <p>
                    Explore more similar subjects, ideas, blogs
                    <br /> and relevant reads.
                  </p>
                </div>
                <div className="row">
                  {item.attributes.Similar_blog.data.map((similar: any) => (
                    <div className="col-md-6" key={similar.id}>
                      <div className="latest-box">
                        <a href="kentico-version-history-and-features">
                          <figure>
                            <img
                              src={
                                strapi.strapihost +
                                similar.attributes.Blogs.image.data.attributes
                                  .url
                              }
                              alt={
                                similar.attributes.Blogs.image.data.attributes
                                  .alternativeText
                              }
                            />
                          </figure>
                          <div className="latest-desc">
                            <div className="label">
                              {similar.attributes.Blogs.tagLabel}
                            </div>
                            <div className="large">
                              {similar.attributes.Blogs.Title}
                            </div>
                            <ul>
                              <li>
                                {moment(similar.attributes.Blogs.Date).format(
                                  "DD MMMM YYYY"
                                )}
                              </li>
                              <li>{similar.attributes.Blogs.Creator}</li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            ""
          )
        )
      )}
    </>
  );
}

export default SlugPage;
