import * as React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HeroSectionContent from "@/components/website/HeroSection/HeroSectionContent";
import BlogContentUpload from "@/components/Blog/BlogContentUpload";
import CaseStudyContentUpdate from "@/components/caseStudy/CaseStudyContentUpdate";

export default function HeroSectionEditor() {
  const location = useLocation();
  const isHeroSection = location.pathname === "/website/hero-section";
  const isBlogPage=location.pathname === "/website/blog-page"
  const isCaseStudies=location.pathname === "/website/case-studies"
  return (
    <div className="w-full mx-auto px-4 py-2 bg-white">
      <Tabs defaultValue="hero" className="w-full bg-white">
        <div className="flex items-center justify-start bg-white border rounded-full p-px  mb-3 shadow-sm">
          <TabsList className=" bg-white h-auto p-0 gap-2 rounded-full text-[#445A64]  ">
            <TabsTrigger value="hero" className="">
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="blog">Blog Page</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hero" className=" ">
          {isHeroSection ? <Outlet /> : <HeroSectionContent />}
        </TabsContent>
        <TabsContent value="blog">
         {isBlogPage ? <Outlet /> : <BlogContentUpload />}
        </TabsContent>
        <TabsContent value="case-studies">
          {isCaseStudies ? <Outlet /> : <CaseStudyContentUpdate />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
