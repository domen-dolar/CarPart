"use client"

import { faAngleDown, faAngleUp, faCartPlus, faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { addToBasket } from "../actions/basket";
import { useRouter } from "next/navigation";

const AddtoBasket = ({ product, session }: { product: any, session: boolean }) => {
    const [quantity, changeQuantity] = useState(1);
    const [fillingBasket, setFillingBasket] = useState(false);
    const [iconIndex, setIconIndex] = useState(0);

    const router = useRouter();

    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

    useEffect(() => {
        if (!fillingBasket) {
            setIconIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % hourglassIcons.length);
        }, 300);

        return () => clearInterval(interval);
    }, [fillingBasket]);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();

                if (!session || fillingBasket) return;

                setFillingBasket(true);

                const formData = new FormData(e.currentTarget);
                await addToBasket(formData);

                setFillingBasket(false);
                router.refresh();
            }}
            className="addProductToBasketForm"
        >
            <input type="text" name="product" value={product.slug.current} readOnly hidden />

            <label htmlFor="quantity" className="text-center">Quantity:</label>
            <div className="bg-white rounded-md">
                <button
                    type="button"
                    onClick={() => changeQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="button changeProductQuantityButton"
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    value={quantity}
                    readOnly
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
            </div>

            <button
                className="button disabled:cursor-not-allowed! disabled:opacity-75!"
                disabled={!session || fillingBasket}
            >
                Add to basket
                <FontAwesomeIcon className="ml-1" icon={fillingBasket ? hourglassIcons[iconIndex] : faCartPlus} />
            </button>
        </form>
    )
}
export default AddtoBasket;