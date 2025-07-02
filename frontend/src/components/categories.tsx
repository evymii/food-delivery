import CardSec from "./CardSec";
import { Card } from "../app/home/page";

type Props = {
  cards?: Card[];
};

const Categories = ({ cards = [] }: Props) => {
  return (
    <div className="flex bg-[#404040] w-screen max-w-[2000px] h-[900px]">
      {cards.map((data) => (
        <CardSec
          key={data.id}
          title={data.title}
          price={data.price}
          description={data.description}
          image={data.poster_path}
        />
      ))}
    </div>
  );
};

export default Categories;
