import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams();
	const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

	return (
		<>
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link
					to="/"
					className="btn btn-light my-3"
				>
					Go Back
				</Link>
			)}

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
							keyword={keyword ? keyword : ""}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default HomeScreen;
