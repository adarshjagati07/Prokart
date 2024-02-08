import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress?.address || "");
	const [city, setCity] = useState(shippingAddress?.city || "");
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
	const [country, setCountry] = useState(shippingAddress?.country || "");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/payment");
	};

	return (
		<FormContainer>
			<CheckoutSteps
				step1
				step2
			/>
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup
					className="my-2"
					controlId="address"
				>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</FormGroup>

				<FormGroup
					className="my-2"
					controlId="city"
				>
					<Form.Label>City:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter City:"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</FormGroup>
				<FormGroup
					className="my-2"
					controlId="postalCode"
				>
					<Form.Label>Postal Code:</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter Postal Code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</FormGroup>
				<FormGroup
					className="my-2"
					controlId="country"
				>
					<Form.Label>Country:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</FormGroup>
				<Button
					type="submit"
					className="my-2"
					variant="primary"
				>
					Place Order
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
