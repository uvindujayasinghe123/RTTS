import React from "react";

import image from "./auth-banner.jpeg";

const AuthBanner = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${image})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				height: "100%",
			}}
		/>
	);
};

export default AuthBanner;
