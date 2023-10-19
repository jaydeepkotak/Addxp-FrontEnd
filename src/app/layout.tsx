"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AddXpHeader from "../Components/Navigations/AddXpHeader";
import AddXpFooter from "../Components/Navigations/AddXpFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import strapi from "../Configurations/Config.json";
import "../assets/src/scss/main.scss";
// import "../assets/src/Lib/app.js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { SEO } from "../Configurations/SEOQuery.js";
import Head from "next/head";
import SEOData from "@/Components/SEO/SEOData";
import { Helmet } from "react-helmet";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Addxp Technologies",
  description: "Digital Customer Experience Management Solution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  let bodyclass = "";
  if (
    pathname == "/brand-guidelines" ||
    pathname == "/strapi-cms-development-service" ||
    pathname == "/strapi-plugin-development-service" ||
    pathname == "/strapi-upgrade-service" ||
    pathname == "/strapi-migration-service" ||
    pathname == "/strapi-cms-consultation-service" ||
    pathname == "/strapi-support-maintenance-service" ||
    pathname == "/strapi-ui-design-service" ||
    pathname == "/hire-strapi-developer" ||
    pathname == "/blogs-insights"
  ) {
    bodyclass = "hire-resource";
  }
  if (pathname == "/commerce-experience" || pathname == "/content-experience" || pathname == "/user-experience") {
    bodyclass = "bg-dark";
  }
  // } else {
  //   bodyclass = "";
  // }
  const [userDetails, setUserDetails] = useState<UserData>();
  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: SEO("aboutUs"),
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
  const gtmContainerId = `(function(w,d,s,l,i) {
    w[l]=w[l]||[]; w[l].push({
      'gtm.start':
        new Date().getTime(),event: 'gtm.js'
    }); var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'? '&l='+l:''; j.async=true; j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NM9VSWDF');`;
  return (
    <html lang='en' className={`${poppins.variable}`}>
      <Helmet defer={false}>
        <script>{gtmContainerId}</script>
      </Helmet>
      <body className={bodyclass}>
        <AddXpHeader />
        {children}
        <AddXpFooter />
        <script async src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'></script>
        {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js'> </script>

        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'></script>
        <script src='https://sdk.amazonaws.com/js/aws-sdk-2.82.0.min.js'></script>
        <script src='https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'></script>
        <script src='https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js'></script>


        <script src='./assets/src/Lib/app.js'></script> */}
      </body>
    </html>
  );
}
