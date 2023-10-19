"use client";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import axios, { AxiosRequestConfig } from "axios";

import { FOOTER } from "../Navigations/Query/NavigationQuery.js";

import React from "react";
import RichText from "../Common";
import Link from "next/link";

export default function AddXpFooter() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: FOOTER,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.footers);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <footer>
      <div className='container'>
        {userDetails?.data.map((item: any) => (
          <div className='footer-main' key={item.id}>
            <div className='footer-box'>
              <img
                src={
                  strapi.strapihost +
                  item.attributes.FooterImg.data.attributes.url
                }
                alt='logo'
                className='circle'
              />
              <p>{item.attributes.FooterTitle}</p>
              <ul className='social-icon'>
                {item.attributes.SocialIcons.map((icondata: any) => (
                  <li key={icondata.id}>
                    <Link href={icondata.LinkIcons[0].href}>
                      <img
                        src={
                          strapi.strapihost + icondata.Icons.data.attributes.url
                        }
                        alt={icondata.Icons.data.attributes.alternativeText}
                      />
                      <img
                        src={
                          strapi.strapihost +
                          icondata.HoverIcon.data.attributes.url
                        }
                        alt={icondata.Icons.data.attributes.alternativeText}
                        className='hover'
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className='email-main footer-email-desktop'>
                {item.attributes.locations.data.map((address: any) => (
                  <ul className='contct-info' key={address.id}>
                    {address.attributes.contact_infos.data.map(
                      (addressinfo: any) =>
                        addressinfo.attributes.ContactInfo.map((child: any) => (
                          <li key={child.id}>
                            <Link href={child.LinkIcons[0].href}>
                              <img
                                src={
                                  strapi.strapihost +
                                  child.Icons.data.attributes.url
                                }
                                alt='mail'
                              />
                              {child.LinkIcons[0].label}
                            </Link>
                          </li>
                        ))
                    )}
                  </ul>
                ))}
              </div>
              {item.attributes.locations.data.map((address: any) => (
                <div
                  className='footer-address d-none d-md-block'
                  key={address.id}
                >
                  <div className='footer-address-title'>
                    <RichText
                      htmlContent={
                        address.attributes.AddressLocation[0].Description
                      }
                    ></RichText>
                  </div>
                  <RichText
                    htmlContent={address.attributes.AddressLocation[0].Body}
                  ></RichText>
                </div>
              ))}
            </div>
            <div className='footer-box'>
              <span className='type1'>{item.attributes.CompanyTitle}</span>
              <ul>
                {item.attributes.Company.map((companydata: any) => (
                  <li key={companydata.id}>
                    <Link href={companydata.LinkIcons[0].href}>
                      <img
                        src={
                          strapi.strapihost +
                          companydata.Icons.data.attributes.url
                        }
                        alt={companydata.Icons.data.attributes.alternativeText}
                      />{" "}
                      <img
                        src={
                          strapi.strapihost +
                          companydata.HoverIcon.data.attributes.url
                        }
                        alt={
                          companydata.HoverIcon.data.attributes.alternativeText
                        }
                        className='hover'
                      />
                      {companydata.LinkIcons[0].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='footer-box services-list'>
              <span className='type1'>{item.attributes.ServiceTitle}</span>
              <div className='footer_services_parent'>
                <ul className='footer-list'>
                  {item.attributes.Services.map((servicedata: any) => (
                    <li key={servicedata.id}>
                      <Link href={servicedata.LinkIcons[0].href}>
                        <img
                          src={
                            strapi.strapihost +
                            servicedata.Icons.data.attributes.url
                          }
                          alt={
                            servicedata.Icons.data.attributes.alternativeText
                          }
                        />
                        <img
                          src={
                            strapi.strapihost +
                            servicedata.HoverIcon.data.attributes.url
                          }
                          alt={
                            servicedata.HoverIcon.data.attributes
                              .alternativeText
                          }
                          className='hover'
                        />
                        {servicedata.LinkIcons[0].label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='footer-box footer-box-mobile'>
              <span className='type1'>Contact Info</span>
              {item.attributes.locations.data.map((address: any) => (
                <ul className='contct-info' key={address.id}>
                  {address.attributes.contact_infos.data.map(
                    (addressinfo: any) =>
                      addressinfo.attributes.ContactInfo.map((child: any) => (
                        <li key={child.id}>
                          <Link href={child.LinkIcons[0].href}>
                            <img
                              src={
                                strapi.strapihost +
                                child.Icons.data.attributes.url
                              }
                              alt='mail'
                            />

                            {child.LinkIcons[0].label}
                          </Link>
                        </li>
                      ))
                  )}
                </ul>
              ))}
            </div>
            <div className='footer-box footer-box-mobile'>
              {item.attributes.locations.data.map((address: any) => (
                <div className='footer-address' key={address.id}>
                  <div className='footer-address-title'>
                    <RichText
                      htmlContent={
                        address.attributes.AddressLocation[0].Description
                      }
                    ></RichText>
                  </div>
                  <RichText
                    htmlContent={address.attributes.AddressLocation[0].Body}
                  ></RichText>
                </div>
              ))}
            </div>
          </div>
        ))}

        {userDetails?.data.map((item: any) => (
          <div className='copy-main' key={item.id}>
            <ul>
              {item.attributes.Copy.map((copydata: any) => (
                <li key={copydata.id}>
                  <Link href={copydata.href}>{copydata.label}</Link>
                </li>
              ))}
            </ul>
            <div className='copy'>{item.attributes.CopyTitle}</div>
          </div>
        ))}
      </div>
    </footer>
  );
}
