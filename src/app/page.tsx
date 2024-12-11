"use client";

import Home from "@/pages/Home";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <React.Fragment>
        <Header />
        <Home />
        <Footer />
    </React.Fragment>
  );
}
