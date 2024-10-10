"use client";

import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";

import ShowTransactions from "@/components/ShowTransactions";
 
export default function page() {
 
    return (
      <>
        <ShowTransactions />
      </>

    );
  }