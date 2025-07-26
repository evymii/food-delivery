import { Card } from "../app/home/page";
import Aptzrs from "./appetizers";
import CardSect from "./cardsec";
import Lunchfavs from "./lunchfavs";
import Salads from "./salads";

type Props = {
  cards?: Card[];
};

const Categories = ({ cards = [] }: Props) => {
  return (
    <div className="flex  gap-5 bg-[#404040] w-full max-w-[2000px] h-max flex-col ">
      <Salads cards={cards} title="Salads" />
      <Aptzrs cards={cards} title="Appetizers" />
      <Lunchfavs cards={cards} title="Lunch Favorites" />
    </div>
  );
};

export default Categories;
