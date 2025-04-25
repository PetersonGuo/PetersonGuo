"use client";
import React from "react";
import Typed from "typed.js";
class Typing extends React.Component {
	componentDidMount() {
		const options = {
			strings: [
				"I am an Electrical Engineer",
			],
			typeSpeed: 50,
			backSpeed: 50,
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
