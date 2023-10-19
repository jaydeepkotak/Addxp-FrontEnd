"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import { Parser } from "html-to-react";
import { Helmet } from "react-helmet";
import RichText from "@/Components/Common.jsx";
import { SEO, SEO_DETAILS } from "@/Configurations/SEOQuery";
import Head from "next/head";
import { useParams, usePathname } from "next/navigation";

export default function SEOData(props: any) {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserData>();
  const [userDetailsAPI, setUserDetailsAPI] = useState<UserData>();
  const searchParams = useParams();
  const parameters = searchParams.blogdetails;
  const configdata: AxiosRequestConfig = {
    method: "GET",
    url: strapi.strapihost + SEO_DETAILS(props.name),
  };

  async function fetchdata1() {
    try {
      const response = await axios(configdata);
      setUserDetailsAPI(response.data);
    } catch (err) {
    } finally {
    }
  }
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
      if (props.name == "/about-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.aboutUs);
      }
      if (props.name == "/contact-us") {
        const response = await axios(config);
        setUserDetails(response.data.data.contactUs);
      }
      if (props.name == "/careers") {
        const response = await axios(config);
        setUserDetails(response.data.data.career);
      }

      if (props.name == "/contentful-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentfulCmsService);
      }
      if (props.name == "/umbraco-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.umbracoDevelopmentService);
      }
      if (props.name == "/kentico-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kenticoDevelopmentService);
      }
      if (props.name == "/contentstack-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.contentstackCmsService);
      }
      if (props.name == "/strapi-cms-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.strapiCmsService);
      }
      if (props.name == "/kontent-ai-development-service") {
        const response = await axios(config);
        setUserDetails(response.data.data.kontentAiDevelopmentService);
      }
      if (props.name == "/virto-commerce-services") {
        const response = await axios(config);
        setUserDetails(response.data.data.virtoCommerceService);
      }
      if (props.name == "/privacy-policy") {
        const response = await axios(config);
        setUserDetails(response.data.data.privacyPolicy);
      }
      if (props.name == "/terms-conditions") {
        const response = await axios(config);
        setUserDetails(response.data.data.termsCondition);
      }
      if (props.name == "/sitemap") {
        const response = await axios(config);
        setUserDetails(response.data.data.sitemap);
      }
      if (props.name == "/brand-guidelines") {
        const response = await axios(config);
        setUserDetails(response.data.data.brandGuideline);
      }
      if (props.name == "/press-release") {
        const response = await axios(config);
        setUserDetails(response.data.data.pressRelease);
      }
      if (props.name == "/ui-ux-designer") {
        const response = await axios(config);
        setUserDetails(response.data.data.uiUxDesigner);
      }
      if (props.name == "/blogs-insights") {
        const response = await axios(config);
        setUserDetails(response.data.data.blogsInsight);
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
      if (props.name == "/thank-you") {
        const response = await axios(config);
        setUserDetails(response.data.data.thankYou);
      }

      // if (props.name == pathname) {
      //   const response = await axios(config);
      //   setUserDetails(response.data.data.pageNotFound);
      // }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }

  useEffect(() => {
    fetchdata();
    fetchdata1();
  }, []);
  const jsonLdData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Example Page",
    description: "This is an example web page.",
    url: "https://www.example.com",
  };
  return (
    <>
      {props.name == parameters ? (
        <>
          <title>{userDetailsAPI?.data[0].attributes.PageTitle}</title>

          <Helmet defer={false}>
            {userDetailsAPI?.data[0].attributes.SEO.structuredData.map(
              (structuredata: any) => (
                <script type="application/ld+json" key={structuredata.id}>
                  {structuredata.structuredData}
                </script>
              )
            )}
          </Helmet>
          {/* check condition for canonical */}
          {userDetailsAPI?.data[0].attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <link
              rel="canonical"
              href={`${userDetailsAPI?.data[0].attributes.SEO.canonicalURL}`}
            ></link>
          )}
          {/* check condition for og:locale */}
          {userDetailsAPI?.data[0].attributes.SEO.metaSocial.locate == null ? (
            ""
          ) : (
            <meta
              property="og:locale"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaSocial.locate}`}
            />
          )}
          {/* check condition for og:type */}
          {userDetailsAPI?.data[0].attributes.SEO.metaSocial.type == null ? (
            ""
          ) : (
            <meta
              property="og:type"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaSocial.type}`}
            ></meta>
          )}
          {/* check condition for metaTitle */}
          {userDetailsAPI?.data[0].attributes.SEO.metaTitle == null ? (
            ""
          ) : (
            <meta
              property="og:title"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaTitle}`}
            />
          )}

          {/* check condition for metaDescription */}
          {userDetailsAPI?.data[0].attributes.SEO.metaDescription == null ? (
            ""
          ) : (
            <meta
              property="og:description"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaDescription}`}
            />
          )}

          {/* check condition for og:image */}
          {userDetailsAPI?.data[0].attributes.SEO.metaSocial.image.data ==
          null ? (
            ""
          ) : (
            <meta
              property="og:image"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaSocial.image.data.attributes.url}`}
            ></meta>
          )}
          {/* check condition for og:image:width */}
          {userDetailsAPI?.data[0].attributes.SEO.metaSocial.Width == null ? (
            ""
          ) : (
            <meta
              property="og:image:width"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaSocial.Width}`}
            ></meta>
          )}
          {/* check condition for og:image:width */}
          {userDetailsAPI?.data[0].attributes.SEO.metaSocial.Height == null ? (
            ""
          ) : (
            <meta
              property="og:image:height"
              content={`${userDetailsAPI?.data[0].attributes.SEO.metaSocial.Height}`}
            ></meta>
          )}
          {/* check condition for or:url */}
          {userDetailsAPI?.data[0].attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <meta
              property="og:url"
              content={`${userDetailsAPI?.data[0].attributes.SEO.canonicalURL}`}
            ></meta>
          )}

          {/* check condition for og:site_name */}
          {userDetailsAPI?.data[0].attributes.SEO.Sitename == null ? (
            ""
          ) : (
            <meta
              property="og:site_name"
              content={`${userDetailsAPI?.data[0].attributes.SEO.Sitename}`}
            ></meta>
          )}
          {/* check condition for article:publisher */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Publisher == null ? (
            ""
          ) : (
            <meta
              property="article:publisher"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Publisher}`}
            />
          )}
          {/* check condition for twitter:card */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Card == null ? (
            ""
          ) : (
            <meta
              name="twitter:card"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Card}`}
            />
          )}
          {/* check condition for twitter:Creator */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Creator == null ? (
            ""
          ) : (
            <meta
              name="twitter:creator"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Creator}`}
            />
          )}
          {/* check condition for twitter:site */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Site == null ? (
            ""
          ) : (
            <meta
              name="twitter:site"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Site}`}
            />
          )}
          {/* check condition for twitter:Title */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Title == null ? (
            ""
          ) : (
            <meta
              name="twitter:title"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Title}`}
            />
          )}
          {/* check condition for twitter:description */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Description ==
          null ? (
            ""
          ) : (
            <meta
              name="twitter:description"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Description}`}
            />
          )}
          {/* check condition for twitter:image */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.Image.data == null ? (
            ""
          ) : (
            <meta
              name="twitter:image"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.Image.data.attributes.url}`}
            />
          )}

          {/* check condition for twitter:label1 */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.label1 == null ? (
            ""
          ) : (
            <meta
              name="twitter:label1"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.label1}`}
            ></meta>
          )}
          {/* check condition for twitter:data1 */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.data1 == null ? (
            ""
          ) : (
            <meta
              name="twitter:data1"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.data1}`}
            ></meta>
          )}
          {/* check condition for twitter:label2 */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.label2 == null ? (
            ""
          ) : (
            <meta
              name="twitter:label2"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.label2}`}
            ></meta>
          )}
          {/* check condition for twitter:data2 */}
          {userDetailsAPI?.data[0].attributes.SEO.SEOCard.data2 == null ? (
            ""
          ) : (
            <meta
              name="twitter:data2"
              content={`${userDetailsAPI?.data[0].attributes.SEO.SEOCard.data2}`}
            ></meta>
          )}
        </>
      ) : (
        <>
          <title>{userDetails?.data.attributes.PageTitle}</title>
          <Helmet defer={false}>
            {userDetails?.data.attributes.SEO.structuredData.map(
              (structuredata: any) => (
                <script type="application/ld+json" key={structuredata.id}>
                  {structuredata.structuredData}
                </script>
              )
            )}
          </Helmet>
          {/* check condition for canonical */}
          {userDetails?.data.attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <link
              rel="canonical"
              href={`${userDetails?.data.attributes.SEO.canonicalURL}`}
            ></link>
          )}
          {/* check condition for og:locale */}
          {userDetails?.data.attributes.SEO.metaSocial.locate == null ? (
            ""
          ) : (
            <meta
              property="og:locale"
              content={`${userDetails?.data.attributes.SEO.metaSocial.locate}`}
            />
          )}
          {/* check condition for og:type */}
          {userDetails?.data.attributes.SEO.metaSocial.type == null ? (
            ""
          ) : (
            <meta
              property="og:type"
              content={`${userDetails?.data.attributes.SEO.metaSocial.type}`}
            ></meta>
          )}
          {/* check condition for metaTitle */}
          {userDetails?.data.attributes.SEO.metaTitle == null ? (
            ""
          ) : (
            <meta
              property="og:title"
              content={`${userDetails?.data.attributes.SEO.metaTitle}`}
            />
          )}

          {/* check condition for metaDescription */}
          {userDetails?.data.attributes.SEO.metaDescription == null ? (
            ""
          ) : (
            <meta
              property="og:description"
              content={`${userDetails?.data.attributes.SEO.metaDescription}`}
            />
          )}

          {/* check condition for og:image */}
          {userDetails?.data.attributes.SEO.metaSocial.image.data == null ? (
            ""
          ) : (
            <meta
              property="og:image"
              content={`${userDetails?.data.attributes.SEO.metaSocial.image.data.attributes.url}`}
            ></meta>
          )}
          {/* check condition for og:image:width */}
          {userDetails?.data.attributes.SEO.metaSocial.Width == null ? (
            ""
          ) : (
            <meta
              property="og:image:width"
              content={`${userDetails?.data.attributes.SEO.metaSocial.Width}`}
            ></meta>
          )}
          {/* check condition for og:image:width */}
          {userDetails?.data.attributes.SEO.metaSocial.Height == null ? (
            ""
          ) : (
            <meta
              property="og:image:height"
              content={`${userDetails?.data.attributes.SEO.metaSocial.Height}`}
            ></meta>
          )}
          {/* check condition for og:url */}
          {userDetails?.data.attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <meta
              property="og:url"
              content={`${userDetails?.data.attributes.SEO.canonicalURL}`}
            ></meta>
          )}

          {/* check condition for og:site_name */}
          {userDetails?.data.attributes.SEO.Sitename == null ? (
            ""
          ) : (
            <meta
              property="og:site_name"
              content={`${userDetails?.data.attributes.SEO.Sitename}`}
            ></meta>
          )}
          {/* check condition for article:publisher */}
          {userDetails?.data.attributes.SEO.SEOCard.Publisher == null ? (
            ""
          ) : (
            <meta
              property="article:publisher"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Publisher}`}
            />
          )}
          {/* check condition for twitter:card */}
          {userDetails?.data.attributes.SEO.SEOCard.Card == null ? (
            ""
          ) : (
            <meta
              name="twitter:card"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Card}`}
            />
          )}
          {/* check condition for twitter:Creator */}
          {userDetails?.data.attributes.SEO.SEOCard.Creator == null ? (
            ""
          ) : (
            <meta
              name="twitter:creator"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Creator}`}
            />
          )}
          {/* check condition for twitter:site */}
          {userDetails?.data.attributes.SEO.SEOCard.Site == null ? (
            ""
          ) : (
            <meta
              name="twitter:site"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Site}`}
            />
          )}
          {/* check condition for twitter:Title */}
          {userDetails?.data.attributes.SEO.SEOCard.Title == null ? (
            ""
          ) : (
            <meta
              name="twitter:title"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Title}`}
            />
          )}
          {/* check condition for twitter:description */}
          {userDetails?.data.attributes.SEO.SEOCard.Description == null ? (
            ""
          ) : (
            <meta
              name="twitter:description"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Description}`}
            />
          )}
          {/* check condition for twitter:image */}
          {userDetails?.data.attributes.SEO.SEOCard.Image.data == null ? (
            ""
          ) : (
            <meta
              name="twitter:image"
              content={`${userDetails?.data.attributes.SEO.SEOCard.Image.data.attributes.url}`}
            />
          )}
          {/* check condition for twitter:label1 */}
          {userDetails?.data.attributes.SEO.SEOCard.label1 == null ? (
            ""
          ) : (
            <meta
              name="twitter:label1"
              content={`${userDetails?.data.attributes.SEO.SEOCard.label1}`}
            ></meta>
          )}
          {/* check condition for twitter:data1 */}
          {userDetails?.data.attributes.SEO.SEOCard.data1 == null ? (
            ""
          ) : (
            <meta
              name="twitter:data1"
              content={`${userDetails?.data.attributes.SEO.SEOCard.data1}`}
            ></meta>
          )}
          {/* check condition for twitter:label2 */}
          {userDetails?.data.attributes.SEO.SEOCard.label2 == null ? (
            ""
          ) : (
            <meta
              name="twitter:label2"
              content={`${userDetails?.data.attributes.SEO.SEOCard.label2}`}
            ></meta>
          )}
          {/* check condition for twitter:data2 */}
          {userDetails?.data.attributes.SEO.SEOCard.data2 == null ? (
            ""
          ) : (
            <meta
              name="twitter:data2"
              content={`${userDetails?.data.attributes.SEO.SEOCard.data2}`}
            ></meta>
          )}
        </>
      )}
    </>
  );
}
