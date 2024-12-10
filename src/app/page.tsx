"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import React from "react";

export default function Page() {
  return (
    <React.Fragment>
      <Header />
      <Home />
      <Footer />
    </React.Fragment>
  );
}
