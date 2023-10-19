"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import DownloadForm from "./DownloadForm";
import { CONTACT_FORM_TITLE_QUERY } from "@/Configurations/CommonQuery";
import { usePathname } from "next/navigation";

export default function Experience(props: any) {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserData>();
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
      setUserDetails(response.data.data.brandGuideline);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="brand-tagline">
      <div className="container">
        <div className="brand-box-main">
          {userDetails?.data.attributes.brand_taglines.data.map((item: any) => (
            <div className="brand-box" key={item.id}>
              <RichText htmlContent={item.attributes.Description}></RichText>

              <ul>
                {item.attributes.Tagline.map((taglist: any) => (
                  <li key={taglist.id}>{taglist.Title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <DownloadForm
          name={pathname}
          query={CONTACT_FORM_TITLE_QUERY("brandGuideline")}
        />
      </div>
    </section>
  );
}
