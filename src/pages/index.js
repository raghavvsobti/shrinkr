import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import "../styles/Home.module.css";
import { getSession } from "next-auth/react"

export default function Home() {
  const [randomEmail, setRandomEmail] = useState("")
  const [urlList, setUrlList] = useState([]);

  const { data } = useSession();

  useEffect(() => {
    (async () => {
      if (data?.user?.email) {
        const res = await fetch("api/url/" + data?.user?.email);
        if (res) {
          let data = await res.json();
          setUrlList(data)
          localStorage.removeItem("randomEmail")
        }

        return;
      } else if (localStorage.getItem("randomEmail")) {
        setRandomEmail(localStorage.getItem("randomEmail") || "")

        const res = await fetch("api/url/" + localStorage.getItem("randomEmail"));
        if (res) {
          let data = await res.json();
          setUrlList(data)
        }

        return;
      } else {
        const random = Math.floor(Math.random() * 10000000000) + "@skrinkr";
        localStorage.setItem("randomEmail", random)
        setRandomEmail(random)

        const res = await fetch("api/url/" + random);
        if (res) {
          let data = await res.json() || [];
          setUrlList(data)
        }

        return;
      }
    })()

  }, [JSON.stringify(data)])

  return <Main urlList={urlList} sessionData={data} randomEmail={randomEmail} />;
}
