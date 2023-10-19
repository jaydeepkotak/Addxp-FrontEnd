"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import { DIRECTOR_MESSAGE } from "../Query/AboutUsQuery.js";

export default function DirectorMessage() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: DIRECTOR_MESSAGE,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.aboutUs);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section>
      <div className="quote-component" id="overview">
        <div className="container">
          {userDetails?.data?.attributes.DirectorMessage.map((item: any) => (
            <div className="row align-items-center" key={item.id}>
              <div className="col-md-5">
                <div className="quote-image">
                  <img
                    src={
                      strapi.strapihost +
                      item?.directorImage.data.attributes.url
                    }
                    alt="quote-image"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="quote-desc">
                  <>
                    <div className="type6">{item.message}</div>
                    <small>
                      {item.directorName} - <span>{item.designation}</span>
                    </small>
                  </>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
