import React, { useEffect, useState } from "react";
import { Form, FormGroup, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	useEffect(() => {
		if (!shippingAddress) {
			navigate("/shipping");
		}
	}, [shippingAddress, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<CheckOutSteps
				step1
				step2
				step3
			/>
			<h1 className="mt-3">Payment Details.</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							className="my-2"
							label="Paypal or Credit Card"
							id="Paypal"
							name="paymentMethod"
							value={paymentMethod}
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</FormGroup>
				<Button
					type="submit"
					variant="primary"
				>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
