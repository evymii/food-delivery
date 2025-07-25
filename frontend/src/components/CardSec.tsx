import { Card } from "./ui/card";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { FoodDetails } from "./fooddetial";
type Props = {
  foodName?: string;
  price?: number;
  ingredients?: string;
  image?: string;
};

const CardSect = ({ foodName, ingredients, image, price }: Props) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Card className="flex flex-col w-100 h-110 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow p-2 gap-1">
      {image && (
        <div className="relative w-full bg-gray-100 flex p-0">
          <img
            src={image}
            alt={foodName}
            className="w-full h-70 object-cover rounded-2xl"
            loading="lazy"
          />

          <FoodDetails
            foodName={foodName}
            price={price}
            ingredients={ingredients}
            image={image}
            onAddToCart={() => setIsAdded(true)} // Callback when added to cart
          >
            <button className=" w-10 h-10 rounded-full mt-57 ml-82 absolute bg-white">
              {isAdded ? (
                <Check className="m-2 text-green-500" />
              ) : (
                <Plus className="m-2 text-red-500" />
              )}
            </button>
          </FoodDetails>
        </div>
      )}
      <div className="my-3 flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-semibold mb-2 text-red-500">
            {foodName}
          </h3>
          {price !== undefined && (
            <p className="text-xl font-bold text-gray-900 mb-2">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
        <p className="text-gray-600 line-clamp-3">{ingredients}</p>
      </div>
    </Card>
  );
};

export default CardSect;
