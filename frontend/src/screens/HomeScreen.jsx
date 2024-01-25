import React from "react";
import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
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
