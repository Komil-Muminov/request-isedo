import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const jwtSecret = "your_jwt_secret";

export function createToken(userId: string): string {
	return jwt.sign({ userId }, jwtSecret);
}

export function authorizeToken(token: string): string | undefined {
	try {
		const result = jwt.verify(token, jwtSecret);
		if (typeof result === "object" && "userId" in result) {
			return result.userId;
		}
	} catch (error) {
		console.error("Ошибка верификации JWT:", error);
	}
	return undefined;
}

export function authorizeRequest(request: Request): string | undefined {
	const token = request.cookies.auth;
	if (typeof token === "string") {
		return authorizeToken(token);
	}
	return undefined;
}

export function authorizeResponse(
	response: Response,
	userId: string,
): Response {
	return response.cookie("auth", createToken(userId), {
		httpOnly: true,
	});
}

export function unauthorizeResponse(response: Response): Response {
	return response.clearCookie("auth");
}
