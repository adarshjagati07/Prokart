import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { resetCart } from "../slices/cartSlice";

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			dispatch(resetCart());
			navigate("/login");
			toast.success("User Logged Out.", { autoClose: 1000 });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<header>
			<Navbar
				bg="dark"
				variant="dark"
				expand="lg"
				collapseOnSelect
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img
								src={logo}
								alt="logo"
							/>
							ProKart
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<SearchBox />
							<LinkContainer to="/cart">
								<Nav.Link>
									<FaShoppingCart /> Cart
									{cartItems.length > 0 && (
										<Badge
											pill
											bg="success"
											style={{ marginLeft: "5px" }}
										>
											{cartItems.reduce((acc, currentItem) => acc + currentItem.qty, 0)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo && userInfo.isAdmin && (
								<NavDropdown
									title="Admin"
									id="adminmenu"
								>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}

							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="username"
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<FaUser /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
