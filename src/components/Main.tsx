import { TypeAnimation } from 'react-type-animation';
import Head from "next/head";
import React, { useEffect, useState } from "react";
import "../styles/Home.module.css";
import CopyUrl from "../components/CopyUrl";
import Image from "next/image";
import "../styles/Home.module.css";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, } from '@fortawesome/free-solid-svg-icons'
import { signOut, signIn } from "next-auth/react"

const Main = ({ urlList, sessionData }) => {
	const [data, setData] = useState(urlList);
	const [newUrl, setNewUrl] = useState("");
	const router = useRouter()
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
		<div className="h-screen w-full overflow-y-clip">
			<Head>
				<title>Shrinkr.</title>
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
				<div className="flex justify-end">
					{sessionData ?
						<div className="bg-gray-700 w-fit flex items-center space-x-2 rounded-full pr-3">
							<span className="bg-gray-200 rounded-l-full w-fit h-full px-2 pl-4 py-2">
								<FontAwesomeIcon icon={faArrowRightFromBracket} className='w-4 cursor-pointer text-red-700 h-4'
									onClick={() => signOut()}
								/>
							</span>
							<p className='text-gray-100 text-end'>{sessionData?.user?.name}</p>
						</div> :
						<div className="cursor-pointer bg-gray-700 w-fit flex items-center space-x-2 rounded-full pr-3"
							onClick={() => signIn("google")}
						>
							<span className="bg-gray-200 rounded-l-full w-fit h-full px-2 pl-4 py-2">
								<svg
									className='text-white'
									xmlns="http://www.w3.org/2000/svg" height="16" width="15.25" viewBox="0 0 488 512">
									<path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
								</svg>
							</span>
							<p className='text-gray-100 text-end font-bold'>Continue with Google</p>
						</div>
					}
				</div>
				<div className="w-full flex justify-center">
					<TypeAnimation
						sequence={[
							"URL Shrinker",
							1000,
							"Shrinkr",
							1000,
							"Shrnkr",
							10000,
						]}
						speed={50}
						repeat={Infinity}
						className='font-semibold text-2xl sm:text-6xl text-white'
					/>
				</div>
				<form className="mb-3 w-full justify-center p-4 sm:p-10" onSubmit={handleOnSubmit}>
					<input
						type="text"
						className="w-[40rem] py-3 rounded-l-xl sm:rounded-l-full px-2"
						placeholder="Enter long url..."
						value={newUrl}
						onChange={(e) => setNewUrl(e.target.value)}
					/>
					<button type="submit" className={`${animate && "animate-pulse"} bg-gray-200 px-6 py-3 rounded-r-xl sm:rounded-r-full font-semibold text-gray-700 mr-2`}>
						Shrink URL
					</button>
				</form>

				{
					data?.length > 0 && <div className="flex justify-center w-full sm:p-4">
						<div className='grid grid-cols-5 bg-transparent backdrop-blur-sm text-gray-50 rounded-md py-4 w-full border-2 border-gray-400'>
							<div className='grid grid-cols-5 col-span-5 border-b-2 mb-2 border-gray-400'>
								<div className='col-span-3 pb-4 px-2 text-gray-300'>Long URL</div>
								<div className='pb-4 text-gray-300'>Short URL</div>
								<div className='pb-4 text-gray-300'>Clicked</div>
							</div>
							<div className='col-span-5 max-h-[calc(100vh-28rem)] py-0 my-0 overflow-y-auto'>
								{data.map((urlObject) => (
									<React.Fragment key={urlObject.code}>
										<div className='col-span-5 grid grid-cols-5 mb-2'>
											<div className='col-span-3 px-2 truncate'>
												<a href={urlObject.url}>
													{urlObject.url.slice(0, 120)}
													{urlObject.url.length > 120 ? "..." : ""}
												</a>
											</div>
											<div className='truncate'>
												<a target="_blank" href={`/api/${urlObject.code}`} onClick={() => setTimeout(() => {
													router.reload()
												}, 100)}>
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
					</div>
				}
				<footer className="text-gray-400 fixed bottom-10 sm:right-10 pr-4 mt-2 font-light">
					Developed by Raghav Sobti
				</footer>
			</main >
		</div >
	);
};

export default Main;
