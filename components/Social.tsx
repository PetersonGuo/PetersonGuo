import Image from "next/image";
import Link from 'next/link';
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
    src: "/logos/GitHub.png",
    link: "https://github.com/PetersonGuo",
    alt: "github logo",
  },
  instagram: {
    src: "/logos/Instagram.webp",
    link: "https://www.instagram.com/petersonguo/",
    alt: "instagram logo",
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

export default function Social({ social, className='', children, size } : SocialProps) {
	return (
		<Link
			href={socials[social].link}
			target="_blank"
			rel="noopener noreferrer"
			className={`logo z-[100] ${className}`}
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
