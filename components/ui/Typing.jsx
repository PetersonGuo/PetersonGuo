"use client";
import React from "react";
import Typed from 'typed.js'
class Typing extends React.Component {
    componentDidMount() {
        const options = {
            strings: ["I am a Software Developer", "I am an Electrical Engineer", "I am a Full Stack Developer", "I am a Frontend Developer", "I am a Backend Developer", "I am a Mobile Developer", "I am a Web Developer", "I am an Embedded Systems Developer", "I am a Security Developer"],
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