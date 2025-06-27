import { Card } from "./ui/card";

type Props = {
  title: string;
  price?: number;
  description: string;
  image?: string;
};

const CardSec = ({ title, description, image, price }: Props) => {
  // const imageUrl = "https://image.tmdb.org/t/p/w500";
  // `${imageUrl}${image}`

  return (
    <div className="max-w-xs">
      <h1>asdas</h1>
      <h3 className="text-lg font-semibold mb-2">{title} msmiwhoewi</h3>
      <Card className="flex flex-col w-full h-auto bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {image && (
          <div className="relative w-full h-48 bg-gray-100">
            <img
              src="../images/appetizerImage.png"
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">
          {price !== undefined && (
            <p className="text-lg font-bold text-gray-900 mb-2">
              ${price.toFixed(2)}
            </p>
          )}
          <p className="text-gray-600 line-clamp-3">{description}</p>
        </div>
      </Card>
    </div>
  );
};

export default CardSec;
