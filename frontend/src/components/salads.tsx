import { Card } from "../app/home/page";
import CardSect from "./cardsec";

type Props = {
  cards?: Card[];
  title?: string;
};

const Salads = ({ cards = [], title }: Props) => {
  return (
    <div className=" flex h-max flex-col py-5 px-25">
      <div className=" my-9 flex">
        <p className=" text-4xl text-white font-semibold">{title}</p>
      </div>
      <div className=" flex flex-wrap gap-4">
        {cards.map((data) => (
          <CardSect
            key={data.id}
            foodName={data.foodName}
            price={data.price}
            ingredients={data.ingredients}
            image={data.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
export default Salads;
