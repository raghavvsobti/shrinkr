import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CopyUrl from "../components/CopyUrl"

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

  return (
    <>
      <Head>
        <title>Url-Shorten</title>
      </Head>
      <main className="content">
        <div className="container">
          <h2 className="mb-3 text-white">URL-Shortener</h2>
          <form className="mb-3" onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="w-75"
              placeholder="Enter long url..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <button type="submit" className="btn btn-dark mx-2">
              Create Short Url
            </button>
          </form>

          <div className="table-responsive custom-table-responsive">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th scope="col">Long URL</th>
                  <th scope="col">Short URL</th>
                  <th scope="col">Clicked</th>
                </tr>
              </thead>
              <tbody>
                {data.map((urlObject) => (
                  <React.Fragment key={urlObject.code}>
                    <tr>
                      <td>
                        {
                          <a href={urlObject.url}>
                            {urlObject.url.slice(0, 120)}
                            {urlObject.url.length > 120 ? "..." : ""}
                          </a>
                        }
                      </td>
                      <td>
                        <a target="_blank" href={`/api/${urlObject.code}`}>
                          {urlObject.code}
                        </a>
                        <CopyUrl urlObject={urlObject} />

                      </td>
                      <td>{urlObject.clicked}</td>
                    </tr>
                    <tr className="spacer">
                      <td colSpan={100}></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
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
