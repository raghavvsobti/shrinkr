import React, { useEffect, useState } from 'react'

const CopyUrl = ({ urlObject }) => {
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false)
			}, 3000);
		}
	}, [isCopied])

	return (
		<section
			className='cursor-pointer text-lime-400 transition-all ease-in duration-200'
			onClick={() => {
				navigator.clipboard.writeText(process.env.BASE_URL + `${urlObject.code}`);
				setIsCopied(true);
			}}
		>
			{isCopied ? "Copied!" : "Copy!"}
		</section>
	)
}

export default CopyUrl