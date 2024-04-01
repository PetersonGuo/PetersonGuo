"use client";
import { useForm } from "react-hook-form";
import sendEmail from "@/utils/sendEmail";
import Social from "../Social";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import "@/css/Contact.css";

export default function Contact() {
	const { register, handleSubmit } = useForm();

	function onSubmit(data) {
		sendEmail(data);
	}

	return (
		<div
			className="py-8 lg:py-16 px-20 w-full bg-[var(--secondary-bg)] rounded-2xl"
			id="contact"
		>
			<div className={"grid grid-cols-3 place-items-center mb-6"}>
				<Social social="linkedin">
					<FaLinkedin size={30} />
				</Social>
				<Social social="instagram">
					<FaInstagram size={30} />
				</Social>
				<Social social="facebook">
					<FaFacebook size={30} />
				</Social>
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
				<button id="send__button">
					<div className="svg-wrapper-1">
						<div className="svg-wrapper">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path fill="none" d="M0 0h24v24H0z"></path>
								<path
									fill="currentColor"
									d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
								></path>
							</svg>
						</div>
					</div>
					<span>Send</span>
				</button>
			</form>
		</div>
	);
}
