import Image from "next/image";
import "@/css/Social.css";

export default function Social({ social, className, children, size }) {
	const socials = {
		github: {
			src: "/logos/GitHub.png",
			link: "https://github.com/PetersonGuo",
			alt: "github logo",
		},
		instagram: {
			src: "/logos/Instagram.webp",
			link: "https://www.instagram.com/petersonguo/",
			alt: "intagram logo",
		},
		facebook: {
			src: "/logos/Facebook.png",
			link: "https://www.facebook.com/petersonguo1",
			alt: "facebook logo",
		},
		linkedin: {
			src: "/logos/Linkedin.png",
			link: "https://www.linkedin.com/in/petersonguo/",
			alt: "linkedin logo",
		},
	};

	return (
		<a
			href={socials[social].link}
			target="_blank"
			rel="noopener noreferrer"
			className={`logo z-[100] ${className}`}
		>
			{children ? children : <Image
				src={socials[social].src}
				height={size}
				width={size}
				alt={socials[social].alt}
			/>}
		</a>
	);
}
