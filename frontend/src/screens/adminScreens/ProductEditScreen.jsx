import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

	const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

	const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

	useEffect(() => {
		if (product) {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [product]);

	const submitHandler = async (e) => {
		e.preventDefault();
		const updatedProduct = {
			productId,
			name,
			price,
			image,
			brand,
			category,
			countInStock,
			description
		};
		const result = await updateProduct(updatedProduct);
		if (result.error) {
			toast.error(result.error);
		} else {
			toast.success("Product Updated", { autoClose: 1000 });
			navigate("/admin/productlist");
			refetch();
		}
	};

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message, { autoClose: 1000 });
			setImage(res.image);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link
				to="/admin/productlist"
				className="btn btn-light my-3"
			>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>

				{loadingUpdate && <Loader />}
				{loadingUpload && <Loader />}

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
							controlId="price "
							className="my-1"
						>
							<Form.Label>Price: </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter Price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="category"
							className="my-1"
						>
							<Form.Label>Category: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="image"
							className="my-1"
						>
							<Form.Label>Image: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Image URL"
								value={image}
								onChange={(e) => setImage}
							></Form.Control>
							<Form.Control
								type="file"
								label="Choose file"
								onChange={uploadFileHandler}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="brand"
							className="my-1"
						>
							<Form.Label>Brand: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="countInStock"
							className="my-1"
						>
							<Form.Label>Count In Stock: </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter Count in Stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group
							controlId="description"
							className="my-1"
						>
							<Form.Label>Description: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
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

export default ProductEditScreen;
