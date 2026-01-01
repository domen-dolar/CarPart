"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faTrashCanArrowUp, faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { removeBasketItem } from "../actions/basket";
import { useEffect, useState } from "react";

export default function RemoveBasketItemButton({ slug }: { slug: string}) {
    const router = useRouter();
    const [trashCan, setTrashCan] =  useState(faTrashCan);
    const [removing, setRemoving] = useState(false);
    const [iconIndex, setIconIndex] = useState(0);

    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

    useEffect(() => {
        if (!removing) {
            setIconIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % hourglassIcons.length);
        }, 300);

        return () => clearInterval(interval);
    }, [removing]);

    const handleRemove = async () => {
        if (removing) return;

        setRemoving(true);

        const formData = new FormData();
        formData.append("product", slug);

        await removeBasketItem(formData);
        setRemoving(false);

        router.refresh();
    };

    return (
        <button
            className="button mx-auto hover:cursor-pointer disabled:cursor-not-allowed! disabled:opacity-75!"
            onClick={handleRemove}
            onMouseEnter={() => setTrashCan(faTrashCanArrowUp)}
            onMouseLeave={() => setTrashCan(faTrashCan)}
            disabled={removing}
        >
            Remove
            <FontAwesomeIcon className="ml-1 text-red-500" icon={removing ? hourglassIcons[iconIndex] : trashCan} />
        </button>
    );
}
