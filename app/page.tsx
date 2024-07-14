import React from "react";

export default function Page() {
	return (
		<div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
			<iframe
				src="https://kaitilynb6.wixsite.com/dapp-deployer"
				style={{
					width: "100%",
					height: "100%",
					border: "none",
				}}
				title="Dapp Deployer"
			/>
		</div>
	);
}
