import { useSession } from "next-auth/react";
import React from "react";
import Main from "../components/Main";
import "../styles/Home.module.css";

export default function Home({ urlList }) {
  const { data } = useSession();
  return <Main urlList={urlList} sessionData={data} />;
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
