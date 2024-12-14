import { useContext } from "react";
import { Link } from "react-router-dom";
// import { explore } from "./../../constants/constants";
import { DetailsContext } from "./../../App";

export default function Dashboard({ explore }) {
  const { setSelectedQuiz } = useContext(DetailsContext);

  return (
    <div
      id="explore"
      className="w-full flex flex-col container py-20 scroll-mt-[80px] max-xl:px-10 dark:text-light"
    >
      <div className="flex pb-10">
        <h3 className="text-3xl font-bold">Tequiz Explore</h3>
      </div>
      <div className="flex flex-wrap gap-20 justify-between max-sm:flex-col max-md:items-center max-sm:gap-7 max-md:gap-14 ">
        {explore.map((el) => (
          <Link
            key={el.imgurl}
            to={`${el.quiz}`}
            onClick={() => setSelectedQuiz(el.subheading)}
          >
            <div className="w-[300px] h-[200px] relative rounded-md shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer">
              <picture
                style={{
                  backgroundImage: `url(${el.imgurl})`,
                }}
                className={`rounded-md bg-no-repeat bg-cover w-full h-full flex`}
              >
                <span
                  className={`${
                    el.category === "frontend"
                      ? "bg-[#FFA500]"
                      : el.category === "backend"
                      ? "bg-[#4B4B4B]"
                      : el.category === "database"
                      ? "bg-[#008080]"
                      : el.category === "digital marketing"
                      ? "bg-[#32CD32]"
                      : el.category === "ai"
                      ? "bg-[#9370DB]"
                      : "bg-[#000]"
                  } absolute top-2 right-2 text-sm px-3 py-1 rounded-full text-light`}
                >
                  {el.category}
                </span>
                <div className="pt-3 flex flex-col gap-4 pl-5">
                  <p className="text-light text-sm opacity-80">
                    {el.subheading}
                  </p>
                  <p className="font-roboto font-semibold text-4xl text-light">
                    {el.name}
                  </p>
                </div>
              </picture>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
