"use client";
import SEOData from "@/Components/SEO/SEOData";
import PrivatePolicy from "./Components/PrivatePolicy";
import { SEO } from "@/Configurations/SEOQuery";
import { usePathname } from "next/navigation";

export default function PrivatePolicyData() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("privacyPolicy")} />
      <PrivatePolicy />
    </>
  );
}
