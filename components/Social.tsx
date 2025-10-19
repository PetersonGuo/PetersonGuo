import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

import "@/css/Social.css";

// Define a type for the socials object entries
interface SocialInfo {
	src: string;
	link: string;
	alt: string;
}

// Define a type for the component props
interface SocialProps {
	social: keyof typeof socials; // Use the keys of the socials object as the type for social
	className?: string;
	children?: ReactElement;
	size?: number; // Use lowercase number for the type
}

// Define the socials object outside the component to avoid re-declaration on each render
const socials: Record<string, SocialInfo> = {
	github: {
		src: "https://images.seeklogo.com/logo-png/30/2/github-logo-png_seeklogo-304612.png",
		link: "https://github.com/PetersonGuo",
		alt: "github logo",
	},
	linkedin: {
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png",
		link: "https://www.linkedin.com/in/petersonguo/",
		alt: "linkedin logo",
	},
};

export default function Social({
	social,
	className = "",
	children,
	size,
}: SocialProps) {
	return (
		<Link
			href={socials[social].link}
			target="_blank"
			rel="noopener noreferrer"
			className={`logo z-[100] hover:scale-110 ease-in-out ${className}`}
		>
			{children ? (
				children
			) : (
				<Image
					src={socials[social].src}
					height={size}
					width={size}
					alt={socials[social].alt}
				/>
			)}
		</Link>
	);
}
