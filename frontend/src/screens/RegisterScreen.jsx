import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			const res = await register({ name, email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success(`User Logged in.`);
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<FormContainer>
			<h1 className="mt-3">Sign Up.</h1>

			<Form
				onSubmit={submitHandler}
				className="mt-4"
			>
				<Form.Group
					className="my-2"
					controlId="name"
				>
					<Form.Label>Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group
					className="my-2"
					controlId="email"
				>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group
					className="my-2"
					controlId="password"
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group
					className="my-2"
					controlId="confirPassword"
				>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button
					type="submit"
					variant="primary"
					className="mt-2"
					disabled={isLoading}
				>
					Register
				</Button>

				{isLoading && <Loader />}
			</Form>
			<Row className="py-3">
				<Col>
					Aleready have an account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
