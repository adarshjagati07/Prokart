import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
	const { pageNumber } = useParams();
	const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

	const [createProduct, { isLoading: createProductLoader }] = useCreateProductMutation();

	const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure?")) {
			try {
				await deleteProduct(id);
				refetch();
				toast.success("Product Deleted", { autoClose: 1000 });
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const createProductHandler = async () => {
		if (window.confirm("Are you sure you want to create a new Product?")) {
			try {
				await createProduct();
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<>
			<Row className="align-item-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button
						className="btn-sm m-3"
						onClick={createProductHandler}
					>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>

			{createProductLoader && <Loader />}
			{loadingDelete && <Loader />}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table
						striped
						hover
						responsive
						className="table-sm"
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE(Rs.)</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
							</tr>
						</thead>
						<tbody>
							{data.products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button
												variant="light"
												className="btn-sm"
											>
												<FaEdit />
											</Button>
										</LinkContainer>
										<Button
											variant="light"
											className="btn-sm"
											onClick={() => deleteHandler(product._id)}
										>
											<FaTrash />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "flex-end",
							minHeight: "22vh"
						}}
					>
						<Paginate
							pages={data.pages}
							page={data.page}
							isAdmin={true}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ProductListScreen;
