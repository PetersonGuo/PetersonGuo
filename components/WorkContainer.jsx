import WorkCard from "./WorkCard";
import WorkData from "@/data/workData";

export default function WorkContainer() {
	return (
		<div className="space-y-3">
			{WorkData.map((data, i) => (
				<WorkCard workData={data} key={`WorkCard${i}`} />
			))}
		</div>
	);
}
