"use client";
import React from "react";
import Typed from "typed.js";
class Typing extends React.Component {
	componentDidMount() {
		const options = {
			strings: [
				"I am a Systems Software Engineer",
				"I am a Performance Software Engineer",
				"I am a Compiler Engineer",
			],
			typeSpeed: 50,
			backSpeed: 30,
			backDelay: 1800,
			// Only rewind as far as the shared "I am a " prefix.
			smartBackspace: true,
			loop: true,
			cursorChar: "|",
		};
		this.typed = new Typed(this.el, options);
	}
	componentWillUnmount() {
		this.typed.destroy();
	}

	render() {
		return (
			<>
				<span
					style={{ whiteSpace: "pre" }}
					ref={(el) => {
						this.el = el;
					}}
				/>
			</>
		);
	}
}
export default Typing;
