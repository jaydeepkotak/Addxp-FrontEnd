"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

import { useRouter } from "next/navigation";

export default function Email(props: any) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserData>();
  const [email, setEmail] = useState("");
  const [searchText, setSearchText] = useState("");
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };
  async function fetchdata() {
    try {
      if (props.name == "/") {
        const response = await axios(config);
        setUserDetails(response.data.data.home);
      }
      if (props.name == "/strapi-cms-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiDevelopment);
      }
      if (props.name == "/strapi-plugin-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiPluginDevelopment);
      }
      if (props.name == "/strapi-upgrade-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUpgrade);
      }
      if (props.name == "/strapi-migration-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiMig);
      }
      if (props.name == "/strapi-support-maintenance-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiSupportAndMaintenance);
      }
      if (props.name == "/strapi-ui-design-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUiUxDesign);
      }
      if (props.name == "/hire-strapi-developer") {
        const response = await axios(config);
        setUserDetails(response.data.data.hireStrapiDeveloper);
      }
      if (props.name == "/commerce-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.commerceExperience);
      }
      if (props.name == "/content-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentExperience);
      }
      if (props.name == "/user-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.userExperience);
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
    setTimeout(() => {
      const elements = document.getElementsByClassName("consultaion-main banner-js");
      if (elements.length === 0) {
        return;
      }
      for (let i = 0; i < elements.length; i++) {
        const src = elements[i].getAttribute("data-img-src");
        if (src) {
          const elementWithStyle = elements[i] as HTMLElement;
          elementWithStyle.style.backgroundImage = `url(${src})`;
        }
      }
    }, 1000);
  }, []);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(strapi.strapigraphql, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation createEmail($Email:String){
            createEmail(data: { Email: $Email}) {
              data {
                id
                attributes {
                  Email
                }
              }
            }
          }
          `,
          variables: {
            Email: searchText,
          },
        }),
      });
      if (response.status == 200) {
        router.push("/thank-you");
      }
    } catch (error) {
      alert("Something Wrong");
    }
  };

  return (
    <section className='consultaion-component'>
      <div className='container'>
        <div
          className='consultaion-main banner-js'
          data-img-src={
            strapi.strapihost + userDetails?.data.attributes.form_title.data.attributes.Form.Images.data.attributes.url
          }
        >
          <div className='consultaion-desc'>
            <h5>{userDetails?.data.attributes.form_title.data.attributes.Form.Title}</h5>
            <RichText htmlContent={userDetails?.data.attributes.form_title.data.attributes.Form.Description}></RichText>
            <div className='search-container'>
              <form onSubmit={handleSubmit}>
                <input
                  type='email'
                  id='CTAEmailID'
                  placeholder='Enter Your Business Email'
                  name='Email'
                  //validationMessage="Please enter Business Emaiil ID"
                  //autocomplete="off"
                  //value={formData.fieldName}
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                />
                <button
                  type='submit'
                  data-form-name='ConsultationFormData'
                  className='btn btn-primary btn-block submit-btn'
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
