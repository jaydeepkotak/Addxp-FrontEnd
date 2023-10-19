"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

import { useRouter } from "next/navigation";

export default function ContactForm(props: any) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserData>();
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [id, setId] = useState("");
  const [sectionClass, setSectionClass] = useState("contact-form light-gray-bg");
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
        setId("connect-now");
        setSectionClass("contact-form");
      }
      if (props.name == "/contact-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.contactUs);
        setId("contact-page-form");
      }
      if (props.name == "/contentstack-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentstackCmsService);
        setId("contentstack-listing-form");
      }
      if (props.name == "/contentful-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentfulCmsService);
        setId("contentful-cms-services-form");
      }
      if (props.name == "/umbraco-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.umbracoDevelopmentService);
        setId("umbraco-listing-form");
      }
      if (props.name == "/strapi-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiCmsService);
        setId("strapi-listing-form");
      }
      if (props.name == "/kentico-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kenticoDevelopmentService);
        setId("kentico-listing-form");
      }
      if (props.name == "/kontent-ai-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kontentAiDevelopmentService);
        setId("kontent-ai-form");
      }
      if (props.name == "/virto-commerce-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.virtoCommerceService);
        setId("connect-now");
      }
      if (props.name == "/strapi-cms-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiDevelopment);
        setId("strapi-cms-page-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/strapi-plugin-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiPluginDevelopment);
        setId("strapi-plugin-development-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/strapi-upgrade-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUpgrade);
        setId("strapi-upgrade-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/strapi-migration-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiMig);
        setId("strapi-migration-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/strapi-cms-consultation-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiConsultation);
        setId("connect-now");
        setSectionClass("contact-form");
      }
      if (props.name == "/strapi-support-maintenance-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiSupportAndMaintenance);
        setId("strapi-maintenance-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/strapi-ui-design-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUiUxDesign);
        setId("strapi-ui-ux-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/hire-strapi-developer") {
        const response = await axios(config);
        setUserDetails(response.data.data.hireStrapiDeveloper);
        setId("strapi-resources-form");
        setSectionClass("contact-form");
      }
      if (props.name == "/commerce-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.commerceExperience);
        setSectionClass("contact-form");
      }
      if (props.name == "/content-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentExperience);
        setSectionClass("contact-form");
      }
      if (props.name == "/user-experience") {
        const response = await axios(config);
        setUserDetails(response.data.data.userExperience);
        setSectionClass("contact-form");
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
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
          mutation createContactFormData($FullName:String!,$BusinessEmail:String!,$CompanyName:String!,$Requirement:String!){
            createContactFormData(data: { FullName: $FullName,BusinessEmail:$BusinessEmail,CompanyName:$CompanyName,Requirement:$Requirement}) {
                data {
                      id
                        attributes {
                            FullName
                            BusinessEmail
                            CompanyName
                            Requirement
                        }
                    }
                }
            }
          `,
          variables: {
            FullName: fullName,
            BusinessEmail: businessEmail,
            CompanyName: companyName,
            Requirement: requirement,
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
    <section className={sectionClass} id={id}>
      <div className='container'>
        <div className='contatc-main'>
          <div className='contact-left'>
            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data.attributes
                  .url
              }
              alt={
                userDetails?.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data.attributes
                  .alternativeText
              }
            />
            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.contact_form.data.attributes.Left.ImageData.ImageMobile.data.attributes.url
              }
              alt={
                userDetails?.data.attributes.contact_form.data.attributes.Left.ImageData.ImageMobile.data.attributes
                  .alternativeText
              }
              className='contact-mobile'
            />
            <div className='caption'>
              <div className='type5'>
                {userDetails?.data.attributes.contact_form.data.attributes.Left.Details.Title}
              </div>
              <RichText
                htmlContent={userDetails?.data.attributes.contact_form.data.attributes.Left.Details.Description}
              ></RichText>
            </div>
          </div>
          <div className='contact-right'>
            <h5>{userDetails?.data.attributes.contact_form.data.attributes.Right.Title}</h5>
            <RichText
              htmlContent={userDetails?.data.attributes.contact_form.data.attributes.Right.Description}
            ></RichText>
            <form id='ContactUsData' onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col'>
                  <div className='form-floating form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='UserName'
                      placeholder='Business Email'
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label htmlFor='UserName'>Full Name</label>
                  </div>
                </div>

                <div className='col'>
                  <div className='form-floating form-group'>
                    <input
                      type='email'
                      className='form-control'
                      id='UserEmailID'
                      placeholder='Business Email'
                      required
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                    <label htmlFor='UserEmailID'>Business Email</label>
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <div className='form-floating form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='UserCompanyName'
                    placeholder='Company Name'
                    required
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <label htmlFor='UserCompanyName'>Company Name</label>
                </div>
              </div>

              <div className='col-12'>
                <div className='form-floating form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='UserRequirements'
                    placeholder='Company Name'
                    onChange={(e) => setRequirement(e.target.value)}
                  />
                  <label htmlFor='UserRequirements'>Describe Your Requirements (Optional)</label>
                </div>
              </div>

              <div className='form-check d-flex'>
                <input className='form-check-input' type='checkbox' value='' id='form2Example34' />
                <label className='form-check-label' htmlFor='form2Example34'>
                  I agree to receive future communications from Addxp, in accordance with the{" "}
                  <a href='/privacy-policy'>Privacy Policy</a> & <a href='/terms-conditions'>Terms Of Use</a>.
                </label>
              </div>

              <input type='reset' id='reset' name='reset' className='d-none' />
              <button
                type='submit'
                id='submit1'
                data-form-name='FooterContactUsData'
                className='btn btn-defualt btn-block abc'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
