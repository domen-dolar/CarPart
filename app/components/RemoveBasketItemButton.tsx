"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { removeBasketItem } from "../actions/basket";

interface RemoveButtonProps {
  slug: string;
}

export default function RemoveBasketItemButton({ slug }: RemoveButtonProps) {
    const router = useRouter();

    const handleRemove = async () => {
        const formData = new FormData();
        formData.append("product", slug);

        await removeBasketItem(formData);

        router.refresh();
    };

    return (
        <button
            className="button mx-auto hover:cursor-pointer"
            onClick={handleRemove}
        >
            Remove
            <FontAwesomeIcon className="ml-1 text-red-500" icon={faTrashCan} />
        </button>
    );
}
