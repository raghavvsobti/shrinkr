import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import "../styles/Home.module.css";
import { getSession } from "next-auth/react"
// import { cookies } from 'next/headers'

export default function Home({ urlList }) {
  const [randomEmail, setRandomEmail] = useState("")
  // const cookieStore = cookies()
  const { data } = useSession();
  // useEffect(() => {
  //   if (!data && !cookieStore.get("randomEmail")) {
  //     const random = Math.floor(Math.random() * 1000) + "@skrinkr";
  //     setRandomEmail(random)
  //     cookieStore.set("randomEmail", random)
  //   }

  // }, [JSON.stringify(data)])

  return <Main urlList={urlList} sessionData={data} randomEmail={randomEmail} />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // const cookieStore = cookies()
  // let randomEmail;
  // if (typeof window !== undefined) {
  //   randomEmail = cookieStore.get("randomEmail");
  // }
  //call api on load
  let res;
  let urlList;
  if (session?.user
    // || randomEmail
  ) {
    res = await fetch(process.env.BASE_URL + "url" + "/" + (session?.user?.email
      // || randomEmail
    ));
    urlList = await res.json()
  } else {
    urlList = [];
  }
  return {
    props: {
      urlList,
    },
  };
}
