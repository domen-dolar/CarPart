"use client";

/*
  Komponenta za spreminjanje količine posameznega izdelka
  v košarici.

  Lastnosti:
  - uporablja server action za posodobitev
  - uporablja useTransition za mehke UI posodobitve
  - samodejno odda formo ob spremembi količine
*/

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { updateBasketItemQuantity } from "../actions/basket";
import { useRouter } from "next/navigation";
import { useBasketTransition } from "./BasketTransitionContext";

/*
  Props:
  - prevQuantity: začetna količina izdelka
  - stock: razpoložljiva zaloga
  - slug: identifikator izdelka
*/

const BasketItemQuantity = ({ prevQuantity, stock, slug }: { prevQuantity: number, stock: number, slug: string }) => {
    // Trenutna količina v lokalnem stanju
    const [quantity, changeQuantity] = useState(prevQuantity);

    // Referenca na formo za programatski submit
    const formRef = useRef<HTMLFormElement>(null);
    // Flag za zaznavanje prvega renderja
    const hasMounted = useRef(false);

    // Router za osvežitev podatkov
    const router = useRouter();

    // Funkcija za zagon tranzicije
    const { startTransition } = useBasketTransition();

     /*
    Effect:
    - sproži se ob spremembi quantity
    - preskoči prvi render
    - odda formo in osveži stran znotraj transitiona
  */
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        startTransition(() => {
            // Programatsko oddamo formo
            formRef.current?.requestSubmit();
            // Osvežimo podatke iz strežnika
            router.refresh();
        });
    }, [quantity])

    return (
        <Form
            ref={formRef}
            action={updateBasketItemQuantity}
            className="basketItemQuantityForm"
        >
             {/* Skriti input s slugom izdelka */}
            <input type="text" name="product" value={slug} readOnly hidden />

            {/* Povečaj količino */}
            <button
                type="button"
                onClick={() => changeQuantity(quantity + 1)}
                disabled={quantity >= stock}
                className="button changeProductQuantityButton"
            >
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            {/* Prikaz trenutne količine */}
            <input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                readOnly
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="w-10 outline-none text-center"
            />
            {/* Zmanjšaj količino */}
            <button
                type="button"
                onClick={() => changeQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className="button changeProductQuantityButton"
            >
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
        </Form>
    )
}
export default BasketItemQuantity;