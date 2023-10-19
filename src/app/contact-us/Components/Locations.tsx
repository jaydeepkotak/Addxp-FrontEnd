"use client";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import strapi from "../../../Configurations/Config.json";
import { LOCATIONS } from "../Query/ContactusQuery.js";
import RichText from "@/Components/Common";

export default function Locations() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: LOCATIONS,
    },
  };

  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.locations);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className='maps-component' id='maps-component'>
      {userDetails?.data.map((item: any) => (
        <div className='container' key={item.id}>
          <div className='row'>
            <div className='col-md-7'>
              {item.attributes.AddressLocation.map((address: any) => (
                <div className='map-desc' key={address.id}>
                  <span className='tag-line'>{address.Title}</span>
                  <h5>{address.SubTitle}</h5>
                  <RichText htmlContent={address.Body}></RichText>
                  {item.attributes.contact_infos.data.map((locationinfo: any) => (
                    <div className='phone-desc' key={locationinfo.id}>
                      {locationinfo.attributes.ContactInfo.map((iconlink: any) => (
                        <a key={iconlink.id} href={iconlink.LinkIcons[0].href} className='phone'>
                          <img src={strapi.strapihost + iconlink.Icons.data.attributes.url} />
                          {iconlink.LinkIcons[0].label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className='col-md-5'>
              <div className='map-images'>
                <iframe src={item.attributes.MapLinks[0].href} loading='lazy'></iframe>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
