import { cn } from "@/lib/utils";
import { DialogOverlayProps } from "@radix-ui/react-dialog";
import React from "react";

type Variant = {
    name: string;
    value: string;
    disabled ?: boolean
};


interface Props {
    items: readonly Variant [];
    onClick?: (value:Variant['value']) => void;
    className?: string;
    selectedValue?: Variant['value']
};

export const GroupVariants : React.FC<Props> = ({ items, onClick, selectedValue, className }) => {
    return (
        <div className={cn(className,'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none')}>
            {
                items.map((item) => (
                    <button key={item.name}>

                    </button>

                ))
            }
        </div>
    );
};