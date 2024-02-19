import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
	const { pageNumber } = useParams();
	const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error?.data?.message || error.error} </Message>
			) : (
				<>
					<h2>New Products</h2>
					<Row>
						{data.products.map((product) => {
							return (
								<Col
									key={product._id}
									sm={12}
									md={6}
									lg={4}
									xl={3}
								>
									<Product product={product} />
								</Col>
							);
						})}
					</Row>
				</>
			)}
		</div>
	);
};

export default HomeScreen;
