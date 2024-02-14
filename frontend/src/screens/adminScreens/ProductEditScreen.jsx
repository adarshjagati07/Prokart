import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
	const { id: productId } = useParams();

	return (
		<div>
			<h2>ProductEditScreen {productId}</h2>
		</div>
	);
};

export default ProductEditScreen;
