import WorkCard from "./WorkCard";
import WorkData from "@/data/workData";

export default function WorkContainer() {
	return (
<>
			<div className={"space-y-2"}>
				{WorkData.map((data, i) => {
					return <WorkCard workData={data} key={`WorkCard${i}`} />;
				})}
			</div>
		</>
	);
}
