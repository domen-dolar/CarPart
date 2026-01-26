"use client";

/*
  Komponenta gumba za odstranjevanje posamezne postavke iz košarice.
  - Prikazuje ikonico smetnjaka.
  - Med odstranjevanjem se prikaže animacija "hourglass".
  - Uporablja server action `removeBasketItem`.
  - Osveži stran po odstranitvi.
*/

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faTrashCanArrowUp, faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { removeBasketItem } from "../actions/basket";
import { useEffect, useState } from "react";


// Props:
// - slug: unikaten identifikator izdelka (product.slug.current)
export default function RemoveBasketItemButton({ slug }: { slug: string}) {
    const router = useRouter();
    // Ikona smetnjaka, ki se spreminja ob hover
    const [trashCan, setTrashCan] =  useState(faTrashCan);
    // Stanje odstranjevanja
    const [removing, setRemoving] = useState(false);
    // Indeks hourglass ikone za animacijo
    const [iconIndex, setIconIndex] = useState(0);

    // Hourglass ikone za animacijo med odstranjevanjem
    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

    // Učinek za animacijo ikon med odstranjevanjem
    useEffect(() => {
        if (!removing) {
            setIconIndex(0);    // reset ikone, če ni v odstranjevanju
            return;
        }

        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % hourglassIcons.length);
        }, 300);    // vsaka 300ms se spremeni ikona

        return () => clearInterval(interval);
    }, [removing]);

    // Funkcija za odstranjevanje postavke
    const handleRemove = async () => {
        if (removing) return;   // prepreči dvojni klik

        setRemoving(true);

        // priprava FormData za server action
        const formData = new FormData();
        formData.append("product", slug);

        // kliče server action
        await removeBasketItem(formData);
        setRemoving(false);

        // osvežitev strani, da se stanje košarice posodobi
        router.refresh();
    };

    return (
        <button
            className="button removeBasketItemButton"
            onClick={handleRemove}
            onMouseEnter={() => setTrashCan(faTrashCanArrowUp)} // hover efekt
            onMouseLeave={() => setTrashCan(faTrashCan)}        // hover out
            disabled={removing}                                 // med odstranjevanjem gumb onemogočen
        >
            Remove
            <FontAwesomeIcon className="ml-1 text-red-500" icon={removing ? hourglassIcons[iconIndex] : trashCan} />
        </button>
    );
}
