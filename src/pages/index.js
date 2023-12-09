import React, { useState } from "react";
import Main from "../components/Main";
import "../styles/Home.module.css";

export default function Home({ urlList }) {
  const [data, setData] = useState(urlList);
  const [newUrl, setNewUrl] = useState("");

  //on submit form call post API
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const _newUrl = newUrl;
    setNewUrl("");
    const response = await fetch("/api/url", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url: _newUrl }),
    });

    const content = await response.json();
    if (content) {
      //add new url above all previous urls
      setData([content, ...data]);
    }
  };

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
