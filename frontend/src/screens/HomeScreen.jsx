import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get("/api/products");
			setProducts(data);
		};
		fetchProducts();
	}, []);
	return (
		<div>
			<Row>
				{products.map((product) => {
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
		</div>
	);
};

export default HomeScreen;
