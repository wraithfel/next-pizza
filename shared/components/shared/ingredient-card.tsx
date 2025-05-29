import { cn } from "@/shared/lib/utils";
import { Circle, CircleCheck } from "lucide-react";
import React from "react";

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    active?: boolean;
    onClick?: () => void;
    className ?: string;
}

export const IngredientCard: React.FC<Props> = ({
  imageUrl, name, price, active, onClick, className
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center p-1 rounded-xl w-28 h-40 text-center relative cursor-pointer bg-white shadow-sm',
        'transition transform duration-200 ease-out',
        {
          'hover:shadow-md hover:scale-105': true,
          'ring-2 ring-primary': active,
        },
        className
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-1 right-1 text-primary" />}
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-contain mb-1"
      />
      <span className="text-xs mb-0.5">{name}</span>
      <span className="font-semibold text-sm">{price} ₽</span>
    </div>
  )
}
