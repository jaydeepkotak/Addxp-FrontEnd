"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ChevronDown } from "react-bootstrap-icons";
import strapi from "../../Configurations/Config.json";
import axios, { AxiosRequestConfig } from "axios";
import { HEADER } from "../Navigations/Query/NavigationQuery.js";
import { usePathname } from "next/navigation";

import React from "react";
import RichText from "../Common";
import HeaderForms from "../HeaderForm/HeaderForms";

export default function AddXpHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [width, setWidth] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const isMobile = width <= 1024;
  const [activeMenuItem, setactivemenuItem] = useState<number>();
  const toggleForm = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  useEffect(() => {
    if (!isMobile) {
      // Get all elements with the class "dropdown-menu"
      const elements = document.getElementsByClassName("dropdown-menu");

      // Convert the HTMLCollection to an array for easier manipulation
      const elementsArray = Array.from(elements);

      // Iterate through each element
      elementsArray.forEach((element) => {
        if (element instanceof HTMLElement) {
          if (element.classList.contains("show")) {
            // Remove the "show" class from each element
            element.classList.remove("show");
          }
        }
      });
    }
  }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("show_form", isOpen);
  }, [isOpen]);
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: HEADER,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.headers);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }

  const [userDetailsAPI, setUserDetailsAPI] = useState<UserData>();
  const configapi: AxiosRequestConfig = {
    method: "GET",
    url:
      strapi.strapihost +
      "/api/blogs?sort[0]=Blogs.Date:desc&populate=Blogs.image&populate=Blogs.Links",
  };

  async function fetchdataapi() {
    try {
      const response = await axios(configapi);
      setUserDetailsAPI(response.data);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }

  useEffect(() => {
    fetchdata();
    fetchdataapi();
  }, []);

  const handleSubLiClick = (e: any, index: any) => {
    e.stopPropagation();
    if (isMobile) {
      setIsActive(true);
      setactivemenuItem(index);
      document.body.classList.add("toggle_slidemenu_open");
    }
  };

  const closeSubMenu = (e: any) => {
    e.stopPropagation();
    const navItems = document.querySelectorAll(".nav-item.show");

    const navItemsArray = Array.from(navItems);
    // console.log("navItemsArray", navItemsArray);
    navItemsArray.forEach((navItem) => {
      if (navItem.classList.contains("show")) {
        navItem.classList.remove("show");
      }
      const link = navItem.querySelector("a.nav-link.show");
      if (link) {
        link.classList.remove("show");
      }
      const dropdownMenu = navItem.querySelector(".dropdown-menu.show");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
    if (isMobile) {
      setIsActive(false);
      if (document.body.classList.contains("toggle_slidemenu_open"))
        document.body.classList.remove("toggle_slidemenu_open");
    }
  };

  useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    // Check if `window` is defined (browser environment) before adding the event listener
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth); // Set the initial width if `window` is defined

      window.addEventListener("resize", handleWindowSizeChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);

  return (
    <>
      <header>
        <Navbar expand='lg' className='navbar'>
          {userDetails?.data.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <Container key={item.id}>
              <Navbar.Brand href='/'>
                <img
                  src={
                    strapi.strapihost + item.attributes.Logo.data.attributes.url
                  }
                  alt={item.attributes.Logo.data.attributes.alternativeText}
                />
              </Navbar.Brand>

              <div className='nav-right'>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                  <div className='mobile-menu-desc'>
                    <img
                      src={
                        strapi.strapihost +
                        item.attributes.MobileView.Images.data[0].attributes.url
                      }
                      alt={
                        item.attributes.MobileView.Images.data[0].attributes
                          .alternativeText
                      }
                    />
                    <RichText
                      htmlContent={item.attributes.MobileView.Description}
                    />
                    <div className='mobile-desc-image'>
                      <img
                        src={
                          strapi.strapihost +
                          item.attributes.MobImage.data.attributes.url
                        }
                        alt={
                          item.attributes.MobImage.data.attributes
                            .alternativeText
                        }
                      />
                    </div>
                  </div>
                  <Nav
                    className='ms-auto mb-2 mb-lg-0'
                    style={{ maxHeight: "100px" }}
                  >
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.SolutionTitle}
                          {<ChevronDown className='bi bi-chevron-down pt-1' />}
                        </span>
                      }
                      onClick={(e) => handleSubLiClick(e, 1)}
                      className={`position-static ${
                        isActive === true ? "open_slide_menu" : ""
                      } ${activeMenuItem === 1 ? "show" : ""}`}
                      id='navbarScrollingDropdown'
                    >
                      <div className='blog-menu '>
                        <div className='mega-content'>
                          <div className='left-section'>
                            <h2
                              className='title-text mobile-text'
                              onClick={(e) => closeSubMenu(e)}
                            >
                              <i className='bi bi-chevron-down pt-1'></i>
                              Solutions
                            </h2>
                            <h2 className='title-text'>
                              {item.attributes.SolutionDesc}
                            </h2>
                          </div>

                          <div className='item-box-container'>
                            {item.attributes.SolutionComponents.map(
                              (solutiondata: any) => (
                                <Link
                                  href={`${solutiondata.Links.href}`}
                                  className='item-box'
                                  key={solutiondata.id}
                                >
                                  <div className='box-title'>
                                    <img
                                      src={
                                        strapi.strapihost +
                                        solutiondata.Icons.data.attributes.url
                                      }
                                      alt={
                                        solutiondata.Icons.data.attributes
                                          .alternativeText
                                      }
                                    />

                                    <span>{solutiondata.Title}</span>
                                  </div>

                                  <RichText
                                    htmlContent={solutiondata.Description}
                                  ></RichText>

                                  <img
                                    src={
                                      strapi.strapihost +
                                      solutiondata.Images.data.attributes.url
                                    }
                                    alt={
                                      solutiondata.Images.data.attributes
                                        .alternativeText
                                    }
                                    className='item-box-bg'
                                  />
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.ServiceTitle}
                          {<ChevronDown className='bi-chevron-down' />}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 2)}
                      className={`position-static ${
                        isActive ? "open_slide_menu" : ""
                      } ${activeMenuItem === 2 ? "show" : ""}`}
                      id='navbarScrollingDropdown'
                    >
                      <div className='service-menu-main'>
                        <div className='row mega-content'>
                          <div className='left-section d-md-none'>
                            <h2
                              className='title-text'
                              onClick={(e) => closeSubMenu(e)}
                            >
                              <i className='bi bi-chevron-down pt-1'></i>
                              Services
                            </h2>

                            <p className='content'>
                              Take your pick from these 6 Services and
                              revolutionize your business.
                            </p>
                            <img
                              src='src/images/header-services.png'
                              alt='header-services'
                            />
                          </div>
                          {item.attributes.Services.map((service: any) => (
                            <div
                              className='col-md-6 service-menu'
                              key={service.id}
                            >
                              <Link
                                href={service.Link.href}
                                className='tech_box pb-30'
                              >
                                <img
                                  src={
                                    strapi.strapihost +
                                    service.Image.data?.attributes.url
                                  }
                                  alt={service.Image.data?.attributes.url}
                                />
                                <RichText
                                  htmlContent={service.Description}
                                ></RichText>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.CompanyTitle}{" "}
                          {<ChevronDown className='bi-chevron-down' />}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 3)}
                      className={`position-static ${
                        isActive ? "open_slide_menu" : ""
                      } ${activeMenuItem === 3 ? "show" : ""}`}
                      id='navbarScrollingDropdown'
                    >
                      <div className='service-menu-main'>
                        <div className='row mega-content company-menu'>
                          <div className='col-md-5'>
                            <div className='left-section'>
                              <h2
                                className='title-text mobile-text '
                                onClick={(e: any) => closeSubMenu(e)}
                              >
                                <i className='bi bi-chevron-down pt-1'></i>
                                {item.attributes.CompanyTitle}
                              </h2>

                              <div className='hide-mobile'>
                                <img
                                  src={
                                    strapi.strapihost +
                                    item.attributes.Company.Image.data
                                      .attributes.url
                                  }
                                  alt={
                                    item.attributes.Company.Image.data
                                      .attributes.alternativeText
                                  }
                                />
                                <h3 className='secondary-title pt-2'>
                                  {item.attributes.Company.Title}
                                </h3>

                                <RichText
                                  htmlContent={
                                    item.attributes.Company.Description
                                  }
                                ></RichText>
                                <Link
                                  href={item.attributes.Company.Link.href}
                                  className='btn-defualt'
                                >
                                  {item.attributes.Company.Link.label}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-7'>
                            <div className='row mt-md-4'>
                              {item.attributes.CompanyDetails.map(
                                (details: any) => (
                                  <div className='col-md-6' key={details.id}>
                                    <Link
                                      href={details.Link.href}
                                      className='compnay-overview pb-30'
                                    >
                                      <div className='d-flex'>
                                        <i
                                          className={details.ClassIcon.replaceAll(
                                            "_",
                                            "-"
                                          )}
                                        ></i>
                                        <span className='secondary-title'>
                                          {details.Detail.Title}
                                          {details.Hiring == true ? (
                                            <span className='hiring-badge'>
                                              Hiring
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                      </div>
                                      <RichText
                                        htmlContent={details.Detail.Description}
                                      ></RichText>
                                    </Link>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.InsightTitle}
                          {<ChevronDown className='bi-chevron-down' />}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 4)}
                      className={`position-static ${
                        isActive ? "open_slide_menu" : ""
                      } ${activeMenuItem === 4 ? "show" : ""}`}
                      id='navbarScrollingDropdown'
                    >
                      <div className='service-menu-main'>
                        <div className='row mega-content blog-menu'>
                          <div className='col-md-8'>
                            <div className='left-section'>
                              <h2
                                className='title-text mobile-text'
                                onClick={(e) => closeSubMenu(e)}
                              >
                                <i className='bi bi-chevron-down pt-1'></i>
                                {item.attributes.InsightTitle}
                              </h2>
                              <h2 className='title-text'>
                                <Link
                                  href={item.attributes.Insights[0].Link.href}
                                >
                                  {item.attributes.Insights[0].Link.label}
                                  <i className='chevron-right'></i>
                                </Link>
                              </h2>
                              <RichText
                                htmlContent={
                                  item.attributes.Insights[0].Description
                                }
                              />
                              <span className='label'>
                                {item.attributes.Insights[0].Title}
                              </span>
                              <div className='blog-overview'>
                                {item.attributes.LatestBlogs == true ? (
                                  <ul>
                                    {item.attributes.blogs.data.map(
                                      (blogs: any, index: any) =>
                                        index <= 2 ? (
                                          <li key={blogs.id}>
                                            <Link
                                              href={`/blogs-insights/${blogs.attributes.Blogs.Links.href}`}
                                            >
                                              <div className='blog-image'>
                                                <img
                                                  src={
                                                    strapi.strapihost +
                                                    blogs.attributes.Blogs.image
                                                      .data.attributes.url
                                                  }
                                                  alt={
                                                    blogs.attributes.Blogs.image
                                                      .data.attributes
                                                      .alternativeText
                                                  }
                                                />
                                              </div>
                                              <p className='content'>
                                                {blogs.attributes.Blogs.Title}
                                              </p>
                                              <span className='blog-link'>
                                                {
                                                  blogs.attributes.Blogs.Links
                                                    .label
                                                }
                                                <i className='arrow-right'>
                                                  <img
                                                    src={
                                                      strapi.strapihost +
                                                      "/uploads/blog_icon_arrow_172020ccbb.svg"
                                                    }
                                                    alt='blog-icon-arrow'
                                                  />
                                                </i>
                                              </span>
                                            </Link>
                                          </li>
                                        ) : (
                                          ""
                                        )
                                    )}
                                  </ul>
                                ) : (
                                  <ul>
                                    {userDetailsAPI?.data.map(
                                      (data: any, index: any) =>
                                        index <= 2 ? (
                                          <li key={index}>
                                            <Link
                                              href={`/blogs-insights/${data.attributes.Blogs.Links.href}`}
                                            >
                                              <div className='blog-image'>
                                                <img
                                                  src={
                                                    strapi.strapihost +
                                                    "/uploads/blog_icon_arrow_172020ccbb.svg"
                                                  }
                                                  alt='blog-icon-arrow'
                                                />
                                              </div>
                                              <p className='content'>
                                                {data.attributes.Blogs.Title}
                                              </p>
                                              <span className='blog-link'>
                                                {
                                                  data.attributes.Blogs.Links
                                                    .label
                                                }
                                                <i className='arrow-right'>
                                                  <img
                                                    src={
                                                      strapi.strapihost +
                                                      "/uploads/blog_icon_arrow_172020ccbb.svg"
                                                    }
                                                    alt='blog-icon-arrow'
                                                  />
                                                </i>
                                              </span>
                                            </Link>
                                          </li>
                                        ) : (
                                          ""
                                        )
                                    )}
                                  </ul>
                                  // <h1>not select latest blog</h1>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='col-md-4'>
                            {/* <a
                                href="blogs-insights.html"
                                className="compnay-overview pb-30 mobile-blog-menu insight-menu"
                              >
                                <div className="d-flex">
                                  <i className="user-edit-icon"></i>
                                  <span className="secondary-title">Blogs</span>
                                </div>
                                <p className="content">
                                  Latest news, industry insights, tech advice
                                  and much more for you to explore.
                                </p>
                              </a> */}
                            {item.attributes.InsightsDetail.map(
                              (insight: any) => (
                                // eslint-disable-next-line react/jsx-key
                                <Link
                                  key={insight.id}
                                  href={insight.Link.href}
                                  className='compnay-overview pb-30 insight-menu'
                                >
                                  <div className='d-flex'>
                                    <i
                                      className={insight.ClassIcon.replaceAll(
                                        "_",
                                        "-"
                                      )}
                                    ></i>
                                    <span className='secondary-title'>
                                      {insight.Detail.Title}
                                    </span>
                                  </div>
                                  <RichText
                                    htmlContent={insight.Detail.Description}
                                  />
                                </Link>
                              )
                            )}
                            {/* <a
                                href="brand-guidelines.html"
                                className="compnay-overview pb-30 insight-menu"
                              >
                                <div className="d-flex">
                                  <i className="user-brand"></i>
                                  <span className="secondary-title">
                                    Brand Guidelines
                                  </span>
                                </div>
                                <p className="content">
                                  Read our brand guidelines for ensuring you use
                                  our brand elements right!
                                </p>
                              </a>
                              <a
                                href="press-release.html"
                                className="compnay-overview pb-30 insight-menu"
                              >
                                <div className="d-flex">
                                  <i className="user-release-icon"></i>
                                  <span className="secondary-title">
                                    Press Release
                                  </span>
                                </div>
                                <p className="content">
                                  All of Addxp’s important announcements, news
                                  and press releases.
                                </p>
                              </a> */}
                          </div>
                        </div>
                      </div>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                <HeaderForms
                  data={
                    item.attributes.contact_form_title.data.attributes.Right
                  }
                />
              </div>
            </Container>
          ))}
        </Navbar>
      </header>
    </>
  );
}
