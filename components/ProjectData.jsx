const BIONIC = {
	forearm: "/models/bionic-evo/forearm.stl",
	palm: "/models/bionic-evo/palm.stl",
	fingerBottom: "/models/bionic-evo/bottom-finger.stl",
	fingerMiddle: "/models/bionic-evo/middle-finger.stl",
	fingerTop: "/models/bionic-evo/finger-top.stl",
};

// Each part was exported at its own origin rather than in assembly
// coordinates, so the full arm is composed explicitly here. Positions are in
// millimetres and share the STLs' own axes (+Z runs down the length of the
// arm). Derived from the parts' bounding boxes:
//   forearm  spans Z 0     -> 286.1, centre X 51.55, centre Y 25.65
//   palm     spans Z 286.1 -> 357.2 once shifted onto the forearm axis
//   fingers  chain from Z 357.2 in 37.1 / 35.8 / 41.1 segments
const FINGER_X = [19.3, 35.6, 52.0, 68.3]; // 4 fingers across the 64.5mm palm
const BIONIC_ASSEMBLY = [
	{ src: BIONIC.forearm, position: [0, 0, 0] },
	{ src: BIONIC.palm, position: [19.3, 10.35, 286.1] },
	...FINGER_X.flatMap((x) => [
		{ src: BIONIC.fingerBottom, position: [x, 2.0, 357.2] },
		{ src: BIONIC.fingerMiddle, position: [x, 11.8, 394.3] },
		{ src: BIONIC.fingerTop, position: [x, 11.8, 430.1] },
	]),
];

const ProjectData = [
	{
		id: "investiq",
		name: "InvestIQ",
		description:
			"A stock analysis tool that provides real-time data and insights to help users make informed investment decisions.",
		link: "https://github.com/PetersonGuo/InvestIQ",
		tech: ["Python", "Tensorflow", "IBKR", "LSTM", "YFinanace"],
	},
	{
		id: "bionic-evo",
		name: "Bionic Evo",
		description:
			"A prosthetic limb that uses AI to optimize movement and provide a more natural user experience.",
		link: "https://github.com/PetersonGuo/BionicEvo",
		tech: ["C++", "Assembly", "STM32"],
		cad: {
			assembly: BIONIC_ASSEMBLY,
			parts: [
				{ name: "Forearm", src: BIONIC.forearm },
				{ name: "Palm", src: BIONIC.palm },
				{ name: "Phalanx (proximal)", src: BIONIC.fingerBottom },
				{ name: "Phalanx (middle)", src: BIONIC.fingerMiddle },
				{ name: "Phalanx (distal)", src: BIONIC.fingerTop },
			],
		},
	},
	{
		id: "sentiview",
		name: "Sentiview",
		description:
			"A sentiment analysis tool that uses machine learning to analyze social media data and provide insights to businesses.",
		link: "https://github.com/PetersonGuo/SentiView",
		tech: ["Python", "React", "Cohere", "Flask", "Selenium"],
	},
	{
		id: "assisted-reader",
		name: "Assisted Reader",
		description:
			"A reading tool that uses AI to help users read more efficiently and retain information better.",
		link: "https://github.com/PetersonGuo/AssistedReader",
		tech: ["Python", "React", "Tesseract", "ESP32", "AutoCorrect", "Flask", "Docker"]
	},
	{
		id: "mindbridge",
		name: "MindBridge",
		description:
			"In a burst of collaborative innovation, our team at MindBridge sought to illuminate the silent struggles of non-verbal autistic children. Each of us, touched by the resilience of these incredible kids, were inspired to harness technology to create a beacon of hope, a tool to turn silence into a symphony of self-expression.",
		link: "https://mindbridge.study",
		devpost: "https://devpost.com/software/mindbridge",
		github: "https://github.com/mindbridge-study/MindBridge",
		tech: ["Python", "React", "FastAPI", "Twillo", "MongoDB", "OpenAI", "Auth0"],
	},
	{
		id: "syllascan",
		name: "SyllaScan",
		description:
			"An AI tool that reads course syllabi and pulls out every assignment deadline, quiz and exam, then syncs them straight into Google Calendar or iCal so students get reminders with enough time to actually prepare.",
		link: "https://github.com/Hayden9898/SyllaScan",
		tech: ["React", "Tailwind", "Python", "FastAPI", "OpenAI", "Google Calendar API"],
	},
	{
		id: "tictactoe",
		name: "TicTacToe AI",
		description:
			"A TicTacToe game that uses AI to provide a challenging opponent for players.",
		link: "https://github.com/PetersonGuo/TicTacToe",
		tech: ["Java"],
		terminal: { type: "java", entry: "/binaries/tictactoe.jar" }
	},
	{
		id: "gemini-ai-hacks",
		name: "Click AI",
		description:
			"(IN PROGRESS) A Camera app with AI Assistance to help you take the perfect picture!",
		link: "https://github.com/mindbridge-study/GeminiAIHacks",
		tech: ["Flutter", "Python", "GeminiAI", "NVIDIA Jetson"],
	},
	{
		id: "ml-upscaler",
		name: "ML Upscaler",
		description:
			"A transformer based real-time upscaler which aims to do 2x upscaling content at 144hz while maintaing visual fidelity.",
		link: "Contact me for more info",
		tech: ["Python", "PyTorch", "ROCm", "C++"],
	},
];
export default ProjectData;