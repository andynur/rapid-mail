import { check } from "k6";
import http from "k6/http";
import { Rate } from "k6/metrics";

const emailRate = new Rate("emails");

export const options = {
	stages: [
		{ duration: "1m", target: 1000 }, // Ramp up to 1000 users over 1 minute
	],
	thresholds: {
		emails: ["rate>0.99"], // 99% of requests should succeed
	},
};

export default function () {
	const url = "http://localhost:3000/api/emails";
	const payload = JSON.stringify({
		sender: "sender@example.com",
		recipient: "recipient@local.dev",
		subject: "Registration Confirmation",
		text: "<html><body><div style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'><div style='max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png' alt='Logo' style='width: 100px; margin-bottom: 20px;'><h1>Registration Confirmation</h1><p>Thank you for registering. Please confirm your email address by clicking the button below.</p><a href='https://example.com/confirm' style='display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 20px;'>Click Me</a></div></div></body></html>",
	});

	const params = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const res = http.post(url, payload, params);

	check(res, {
		"status is 201": (r) => r.status === 201,
	});

	emailRate.add(res.status === 201);
}
