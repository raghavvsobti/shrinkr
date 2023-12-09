import React, { useState } from "react";
import Main from "../components/Main";
import "../styles/Home.module.css";

export default function Home({ urlList }) {
  return <Main urlList={urlList} />;
}

export async function getServerSideProps(context) {
  //call api on load
  const res = await fetch(process.env.BASE_URL + "url");
  const urlList = await res.json();

  return {
    props: {
      urlList,
    },
  };
}
