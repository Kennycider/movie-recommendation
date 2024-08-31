"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return null;
}

export default Page