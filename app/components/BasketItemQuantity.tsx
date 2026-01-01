"use client";

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { updateBasketItemQuantity } from "../actions/basket";
import { useRouter } from "next/navigation";
import { useBasketTransition } from "./BasketTransitionContext";

const BasketItemQuantity = ({ prevQuantity, stock, slug }: { prevQuantity: number, stock: number, slug: string }) => {
    const [quantity, changeQuantity] = useState(prevQuantity);

    const formRef = useRef<HTMLFormElement>(null);
    const hasMounted = useRef(false);

    const router = useRouter();

    const { startTransition } = useBasketTransition();

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        startTransition(() => {
            formRef.current?.requestSubmit();
            router.refresh();
        });
    }, [quantity])

    return (
        <Form
            ref={formRef}
            action={updateBasketItemQuantity}
            className="basketItemQuantityForm"
        >
            <input type="text" name="product" value={slug} readOnly hidden />

            <button
                type="button"
                onClick={() => changeQuantity(quantity + 1)}
                disabled={quantity >= stock}
                className="button changeProductQuantityButton"
            >
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                readOnly
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="w-10 outline-none text-center"
            />
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