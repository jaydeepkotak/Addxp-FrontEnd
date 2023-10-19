"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { STRAPI_VERSIONS } from "../Query/StrapiUpgradeQuery.js";

export default function StrapiVersions(props: any) {
  let ids = "#";
  const [userDetails, setUserDetails] = useState<UserData>();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabdata, setActiveTabData] = useState(0);
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  const handleTabDataClick = (index: any) => {
    setActiveTabData(index);
  };
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: STRAPI_VERSIONS,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.strapiUpgrade);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <section className='strapi-tab-section'>
      <div className='container'>
        <h5>{userDetails?.data.attributes.srapi_versions.data[0].attributes.MainTitle.Title}</h5>
        <RichText
          htmlContent={userDetails?.data.attributes.srapi_versions.data[0].attributes.MainTitle.Description}
        ></RichText>
        <div className='tab-section'>
          <ul className='nav nav-tabs' id='myTab' role='tablist'>
            {userDetails?.data.attributes.srapi_versions.data.map((tab: any, index: any) => (
              <li className='nav-item' role='presentation' key={tab.id}>
                <button
                  className={index === activeTabdata ? "nav-link active" : "nav-link"}
                  id={tab.attributes.VersionTab.TabId.replaceAll("_", "-")}
                  data-bs-toggle='tab'
                  data-bs-target={ids + tab.attributes.VersionTab.Target}
                  type='button'
                  role='tab'
                  aria-controls='home'
                  aria-selected={tab.attributes.VersionTab.id == 1 ? "true" : "false"}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.attributes.VersionTab.TabTitle}
                </button>
              </li>
            ))}
          </ul>
          <div className='tab-content' id='myTabContent'>
            {userDetails?.data.attributes.srapi_versions.data.map((tab: any, index: any) => (
              <div
                key={tab.id}
                className={index === activeTab ? "tab-pane fade active show" : "tab-pane fade"}
                id={tab.attributes.VersionTab.Target}
                role='tabpanel'
                aria-labelledby={tab.attributes.VersionTab.TabId.replaceAll("_", "-")}
                onClick={() => handleTabDataClick(index)}
              >
                <div className='tab-content-top'>
                  <h5>{tab.attributes.VersionTab.TabTitle}</h5>
                  <RichText htmlContent={tab.attributes.VersionTab.TabDesc}></RichText>
                </div>
                <div className='row'>
                  {tab.attributes.VersionDetails.map((details: any) => (
                    <div className='col-md-4' key={details.id}>
                      <div className='tab-content-box'>
                        <div className='type6'>{details.Title}</div>
                        <RichText htmlContent={details.Description}></RichText>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
