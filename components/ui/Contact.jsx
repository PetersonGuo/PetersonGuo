"use client";
import { useForm } from "react-hook-form";
import sendEmail from "@/utils/sendEmail";
import Social from "../Social";

export default function Contact() {
	const { register, handleSubmit } = useForm();

	function onSubmit(data) {
		sendEmail(data);
	}

	return (
		<div className="py-8 lg:py-16 px-20 w-full bg-[#0f0f0f] rounded-2xl" id="contact">
			<div className={"grid grid-cols-3 place-items-center mb-6"}>
				<Social social="linkedin" size={30} />
				<Social social="instagram" size={30} />
				<Social social="facebook" size={30} />
			</div>
			<div className={"border-b-2 border-gray-300 mb-6"}></div>
			<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
				Contact Me
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div>
					<input
						type="email"
						id="email"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Email"
						required
					/>
				</div>
				<div>
					<input
						type="text"
						id="subject"
						className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Subject"
						required
					/>
				</div>
				<div className="sm:col-span-2">
					<textarea
						id="message"
						rows="6"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Leave a message..."
					></textarea>
				</div>
				<button
					type="submit"
					className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
				>
					Send message
				</button>
			</form>
		</div>
	);
}
