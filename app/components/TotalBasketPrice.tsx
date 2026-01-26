"use client";

/*
  Komponenta za prikaz skupne cene izdelkov v košarici.
  - Če je tranzicija (npr. posodabljanje količine ali dodajanje v košarico) v teku,
    se prikaže animacija "hourglass".
  - Ko tranzicija konča, se prikaže dejanska cena.
*/

import { faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useBasketTransition } from "./BasketTransitionContext";


// Props:
// - totalPrice: skupna cena vseh postavk v košarici (number)
const TotalBasketPrice = ({ totalPrice }: { totalPrice: number }) => {
    // Stanje za indeks hourglass ikone
    const [iconIndex, setIconIndex] = useState(0);
    // Uporaba konteksta za spremljanje, če je tranzicija v teku
    const { isPending } = useBasketTransition();

    // Hourglass ikone za animacijo
    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

    // Efekt za animacijo med tranzicijo
    useEffect(() => {
        if (!isPending) {
            setIconIndex(0);        // reset ikone, če ni v tranziciji
            return;
        }

        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % hourglassIcons.length);
        }, 300);        // spremeni ikono vsake 300ms

        return () => clearInterval(interval);
    }, [isPending]);
    // Prikaže animacijo med posodabljanjem
    
    return (
        <div>
            {isPending ? (
            <FontAwesomeIcon icon={hourglassIcons[iconIndex]} />
        ) : (
            // Prikaže dejansko skupno ceno, ko ni v tranziciji
            <span>{totalPrice} €</span>
        )}
        </div>
    )
}
export default TotalBasketPrice;