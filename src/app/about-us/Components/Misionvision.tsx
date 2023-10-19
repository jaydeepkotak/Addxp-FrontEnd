"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { MISIONVISION } from "../Query/AboutUsQuery.js";

export default function Misionvision() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: MISIONVISION,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.missionVisions);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="image-component" id="vision-and-mission">
      <div className="container">
        <div className="image-desc">
          {userDetails?.data.map((item: any) =>
            item.attributes.MissionVision.map((subitem: any) => (
              <div className="row align-items-center" key={subitem.id}>
                <div className="col-md-6 left-desc">
                  <div className="map-desc">
                    <span className="tag-line">{subitem.SubTitle}</span>
                    <h5>{subitem.Title}</h5>
                    <RichText htmlContent={subitem.Description}></RichText>
                  </div>
                </div>
                <div className="col-md-6 right-image">
                  <div className="map-images">
                    <img
                      src={
                        strapi.strapihost + subitem?.Images.data.attributes.url
                      }
                      alt="image-compoent1"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
