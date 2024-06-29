import { Button } from "../Button";
import { useState } from "react";

export const LogoutButton = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:4000/logout", {
				method: "POST",
			});
			if (response.ok) {
				console.log("Logged out successfully");
			} else {
				throw new Error("Failed to logout. Please try again later.");
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="logout-button">
			<Button kind="secondary" onClick={handleLogout} isLoading={isLoading}>
				Выйти
			</Button>
		</div>
	);
};
