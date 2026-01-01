"use client";

import { faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useBasketTransition } from "./BasketTransitionContext";

const TotalBasketPrice = ({ totalPrice }: { totalPrice: number }) => {
    const [iconIndex, setIconIndex] = useState(0);
    const { isPending } = useBasketTransition();

    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

    useEffect(() => {
        if (!isPending) {
            setIconIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % hourglassIcons.length);
        }, 300);

        return () => clearInterval(interval);
    }, [isPending]);
    
    return (
        <div>
            {isPending ? (
            <FontAwesomeIcon icon={hourglassIcons[iconIndex]} />
        ) : (
            <span>{totalPrice} €</span>
        )}
        </div>
    )
}
export default TotalBasketPrice;