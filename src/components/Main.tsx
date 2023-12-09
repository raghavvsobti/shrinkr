import { TypeAnimation } from 'react-type-animation';
import Head from "next/head";
import React, { useEffect, useState } from "react";
import "../styles/Home.module.css";
import CopyUrl from "../components/CopyUrl";
import Image from "next/image";
import "../styles/Home.module.css";

const Main = ({ urlList }) => {
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

	const [animate, setAnimate] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAnimate(false)
		}, 6000);
	}, [])


	return (
		<div className="h-screen w-full">
			<Head>
				<title>Shrinkr</title>
			</Head>
			<Image
				className="z-0"
				src="/background.jpeg"
				fill
				style={{
					objectFit: "cover",
				}}
				quality={100}
				alt="bg"
			/>
			<main className="relative w-full p-10 z-10">
				<div className="w-full flex justify-center">
					<TypeAnimation
						sequence={[
							"Url Shrinker",
							1000,
							"Shrinkr",
							1000,
							"Shrnkr",
							1000,
						]}
						speed={50}
						repeat={Infinity}
						className='font-semibold text-6xl text-white'
					/>
					{/* <h2 className={`mb-3 text-6xl font-bold text-gray-100 ${animate && "animate-pulse"}`}>Shrinkr.</h2> */}
				</div>
				<form className="mb-3 w-full justify-center p-10" onSubmit={handleOnSubmit}>
					<input
						type="text"
						className="w-[40rem] py-3 rounded-l-full px-2"
						placeholder="Enter long url..."
						value={newUrl}
						onChange={(e) => setNewUrl(e.target.value)}
					/>
					<button type="submit" className="animate-pulse bg-gray-200 px-6 py-3 rounded-r-full font-semibold text-gray-700 mr-2">
						Shrink Url
					</button>
				</form>

				<div className="flex justify-center w-full sm:p-4">
					<div className='grid grid-cols-5 bg-[#2e2e36] text-gray-50 rounded-md py-4 w-full border-2 border-gray-400'>
						<div className='grid grid-cols-5 col-span-5 border-b-2 mb-2 border-gray-600'>
							<div className='col-span-3 pb-4 px-2 text-gray-300'>Long URL</div>
							<div className='pb-4 text-gray-300'>Short URL</div>
							<div className='pb-4 text-gray-300'>Clicked</div>
						</div>
						{data.map((urlObject) => (
							<React.Fragment key={urlObject.code}>
								<div className='col-span-5 grid grid-cols-5 mb-2'>
									<div className='col-span-3 px-2 truncate'>
										<a href={urlObject.url}>
											{urlObject.url.slice(0, 120)}
											{urlObject.url.length > 120 ? "..." : ""}
										</a>
									</div>
									<div>
										<a target="_blank" href={`/api/${urlObject.code}`}>
											{urlObject.code}
										</a>
										<CopyUrl urlObject={urlObject} />
									</div>
									<div>{urlObject.clicked}</div>
								</div>

							</React.Fragment>
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Main;
