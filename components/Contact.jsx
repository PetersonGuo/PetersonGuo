"use client";

import { useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbCheck, TbAlertTriangle } from "react-icons/tb";

import Social from "./Social";
import "@/css/Contact.css";

const field =
	"w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-blue-400/60 focus:bg-white/[0.06]";

export default function Contact() {
	const formRef = useRef(null);
	const email = useRef();
	const subject = useRef();
	const message = useRef();

	const [status, setStatus] = useState({ state: "idle", message: "" });
	const sending = status.state === "sending";

	const socialButtons = (
		<>
			<Social social="github">
				<span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/35 hover:text-white">
					<FaGithub size={20} />
				</span>
			</Social>
			<Social social="linkedin">
				<span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/35 hover:text-white">
					<FaLinkedin size={20} />
				</span>
			</Social>
		</>
	);

	async function submit(e) {
		e.preventDefault();
		setStatus({ state: "sending", message: "" });

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.current.value,
					subject: subject.current.value,
					message: message.current.value,
				}),
			});

			const body = await res.json().catch(() => ({}));
			if (!res.ok || !body.success) {
				setStatus({
					state: "error",
					message: body.error ?? "Something went wrong. Please try again.",
				});
				return;
			}

			setStatus({ state: "sent", message: "Thanks! I'll get back to you soon." });
			formRef.current?.reset();
		} catch (err) {
			console.error("Contact form error:", err);
			setStatus({
				state: "error",
				message: "Could not reach the server. Please try again.",
			});
		}
	}

	return (
		<div
			id="contact"
			className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--secondary-bg)] px-6 py-12 md:px-12"
		>
			<div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-14">
				{/* Left: intro */}
				<div>
					<div className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
						<span className="h-px w-6 bg-blue-400/50" />
						Contact
					</div>

					<h2 className="bg-gradient-to-br from-white via-white to-white/55 bg-clip-text text-3xl leading-tight text-transparent sm:text-4xl">
						Get in touch
					</h2>

					<p className="mt-4 text-base leading-relaxed text-gray-400">
						Have a question, an idea, or just want to say hi? Drop me a message
						and I&apos;ll reply as soon as I can.
					</p>

					{/* Desktop only: when the columns stack on mobile these sit
					    between the intro and the form and break the flow, so the
					    mobile copy lives below the form instead. */}
					<div className="mt-8 hidden items-center gap-3 md:flex">
						{socialButtons}
					</div>
				</div>

				{/* Right: form */}
				<form ref={formRef} onSubmit={submit} className="w-full space-y-4">
					<input
						type="email"
						id="email"
						ref={email}
						className={field}
						placeholder="Email"
						aria-label="Email"
						required
					/>
					<input
						type="text"
						id="subject"
						ref={subject}
						className={field}
						placeholder="Subject"
						aria-label="Subject"
						required
					/>
					<textarea
						id="message"
						ref={message}
						rows="6"
						className={`${field} resize-none`}
						placeholder="Leave a message..."
						aria-label="Message"
						required
					/>

					<div className="flex flex-col items-start gap-4 pt-2">
						<button id="send__button" type="submit" disabled={sending}>
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
							<span>{sending ? "Sending" : "Send"}</span>
						</button>

						{status.state === "sent" && (
							<span className="inline-flex items-center gap-1.5 text-sm text-green-400">
								<TbCheck size={16} />
								{status.message}
							</span>
						)}
						{status.state === "error" && (
							<span className="inline-flex items-center gap-1.5 text-center text-sm text-red-400">
								<TbAlertTriangle size={16} className="shrink-0" />
								{status.message}
							</span>
						)}
					</div>
				</form>
			</div>

			{/* Mobile: socials close out the card instead of splitting the intro
			    from the form. */}
			<div className="mt-10 flex items-center justify-center gap-3 border-t border-white/10 pt-8 md:hidden">
				{socialButtons}
			</div>
		</div>
	);
}
