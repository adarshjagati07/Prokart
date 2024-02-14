import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

const Loader = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "45vh"
			}}
		>
			<RiseLoader
				color="#7B8A8B"
				size={20}
			/>
		</div>
	);
};

export default Loader;
