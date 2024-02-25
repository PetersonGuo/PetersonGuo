export default function WorkCard({children, title, description, time, company}) {
    return (
        <div
            className={"h-[20vh] even:justify-self-end w-[60%] justify-self-start px-4 py-3 rounded-xl even:ml-auto even:mr-0 even:text-right bg-slate-700 my-5"}>
            <div className={"flex flex-row justify-between"}>
                <h3>{title}</h3>
                <h4>{company}</h4>
            </div>
            <h4>{time}</h4>
            <p>
                {description}
            </p>
        </div>
    );
}