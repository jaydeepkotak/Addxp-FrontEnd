"use client";
import SEOData from "@/Components/SEO/SEOData";
import TermsCondition from "../terms-conditions/Components/TermsCondition";
import { SEO } from "@/Configurations/SEOQuery";
import { usePathname } from "next/navigation";

export default function Termsconditions() {
  const pathname = usePathname();
  return (
    <>
      <SEOData name={pathname} query={SEO("termsCondition")} />
      <TermsCondition />
    </>
  );
}
