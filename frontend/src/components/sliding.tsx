import React from "react";

interface Item {
  content: string;
}

export function Sliding({ items }: { items: Item[] }) {
  const duplicatedItems = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ];

  return (
    <div className="relative w-screen h-25 bg-red-500 overflow-hidden py-4">
      <div className="flex">
        <div className="flex animate-marquee whitespace-nowrap ">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.content}-${index}`}
              className="mx-4 inline-block "
            >
              <p className="px-6 py-4 text-white text-2xl font-extrabold">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
