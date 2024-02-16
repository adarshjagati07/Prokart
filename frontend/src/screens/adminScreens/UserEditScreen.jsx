import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";

const UserEditScreen = () => {
	const { id: userId } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);

	const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

	const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateUser({ userId, name, email, isAdmin });
			toast.success("User Updated", { autoClose: 1000 });
			refetch();
			navigate("/admin/userlist");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link
				to="/admin/userlist"
				className="btn btn-light my-3"
			>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>

				{loadingUpdate && <Loader />}

				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group
							controlId="name"
							className="my-1"
						>
							<Form.Label>Name: </Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="email"
							className="my-1"
						>
							<Form.Label>Email: </Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="isAdmin"
							className="my-1"
						>
							<Form.Check
								type="checkbox"
								label="Is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button
							className="btn my-2"
							type="submit"
							variant="primary"
						>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
