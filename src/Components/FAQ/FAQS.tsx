import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import strapi from "../../Configurations/Config.json";
import RichText from "../Common";

function FAQS(props: any) {
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
      if (props.name == "/contentstack-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentstackCmsService);
      }
      if (props.name == "/contentful-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentfulCmsService);
      }
      if (props.name == "/umbraco-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.umbracoDevelopmentService);
      }
      if (props.name == "/strapi-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiCmsService);
      }
      if (props.name == "/kentico-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kenticoDevelopmentService);
      }
      if (props.name == "/kontent-ai-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kontentAiDevelopmentService);
      }
      if (props.name == "/virto-commerce-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.virtoCommerceService);
      }
      if (props.name == "/strapi-upgrade-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiUpgrade);
      }
      if (props.name == "/strapi-migration-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiMig);
      }
      if (props.name == "/strapi-cms-consultation-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiConsultation);
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
  }, []);
  return (
    <>
      <section className="accrodian-section">
        <div className="container">
          <div className="accordian-top">
            <h5>
              {
                userDetails?.data.attributes.faq_title.data.attributes.FAQTitle
                  .Title
              }
            </h5>
            <RichText
              htmlContent={
                userDetails?.data.attributes.faq_title.data.attributes.FAQTitle
                  .Description
              }
            ></RichText>
          </div>
          <Accordion defaultActiveKey="0" className="accordian_main">
            {userDetails?.data.attributes.faqs.data.map(
              (faq: any, index: any) => (
                <Accordion.Item
                  eventKey={String(index)}
                  className="accordion-wrapper"
                  key={faq.id}
                >
                  <Accordion.Header>
                    {faq.attributes.FAQ[0].Question}
                  </Accordion.Header>
                  <Accordion.Body className="collepsing-div">
                    <RichText
                      htmlContent={faq.attributes.FAQ[0].Answer}
                    ></RichText>
                  </Accordion.Body>
                </Accordion.Item>
              )
            )}
          </Accordion>
        </div>
      </section>
    </>
  );
}

export default FAQS;
