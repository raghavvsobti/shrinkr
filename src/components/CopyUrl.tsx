import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy as solidCopy } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'

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
			className='cursor-pointer text-gray-50 transition-all ease-in duration-200'
			onClick={() => {
				navigator.clipboard.writeText(process.env.BASE_URL + `${urlObject.code}`);
				setIsCopied(true);
			}}
		>
			{isCopied ?
				<div className='flex items-center mt-1'>
					<FontAwesomeIcon icon={solidCopy} className='w-4 h-4 mr-1' />
					<p className='text-xs text-white'>Copied!</p>
				</div>
				:
				<div className='flex items-center mt-1'>
					<FontAwesomeIcon icon={faCopy} className='w-4 h-4 cursor-pointer' />
					<p className='text-xs opacity-0 text-white'>Copy</p>
				</div>
			}
		</section>
	)
}

export default React.memo(CopyUrl)