import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const MyToast = ({ toggleShow, link }) => {
	const [show, setShow] = useState(true);

	toggleShow = () => setShow(!show);

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				setShow(false)
			}, 3000);
		}
	}, [show])

	return (
		<>
			{show && <Row className='z-50 fixed top-10'>
				<Col md={6} className="mb-2">
					<Toast show={show} onClose={toggleShow}>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded me-2"
								alt=""
							/>
							<strong className="me-auto"> Copied!</strong>
						</Toast.Header>
						<Toast.Body>{link}</Toast.Body>
					</Toast>
				</Col>
			</Row>}
		</>
	);
}

export default MyToast;