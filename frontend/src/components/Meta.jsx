import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta
				name="description"
				content={description}
			/>
			<meta
				name="keywords"
				content={keywords}
			/>
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Welcome to ProKart",
	description: "We sell the best and authorised Products.",
	keywords: "electronics, cheap electronics, diversity"
};

export default Meta;
