import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { clearCartItems } from "../slices/cartSlice.js";
import Message from "../components/Message.jsx";

const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	const cart = useSelector((state) => state.cart);
	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate("/shipping");
		} else if (!cart.paymentMethod) {
			navigate("payment");
		}
	}, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: (cart.itemsPrice / 83).toFixed(2),
				shippingPrice: (cart.shippingPrice / 83).toFixed(2),
				taxPrice: (cart.taxPrice / 83).toFixed(2),
				totalPrice: (cart.totalPrice / 83).toFixed(2)
			}).unwrap();
			dispatch(clearCartItems());
			navigate(`/order/${res._id}`);
			toast.success("Order placed.", { autoClose: 1000 });
		} catch (error) {
			toast.error(error, { autoClose: 1000 });
		}
	};

	return (
		<>
			<CheckoutSteps
				step1
				step2
				step3
				step4
			/>
			<h1>Place Order</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>Shipping</h3>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address},{cart.shippingAddress.city}
								{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>Payment Method</h3>
							<p>
								<strong>Method:</strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>OrderItems</h3>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is Empty!</Message>
							) : (
								<ListGroup>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>Order Summary</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items:</Col>
									<Col>Rs.{cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping:</Col>
									<Col>Rs.{cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>Rs.{cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>Rs.{cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{error && <Message variant="danger">{error.data.message}</Message>}

							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
								{isLoading && <Loader />}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
