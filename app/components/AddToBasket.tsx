"use client"

/*
  Client komponenta za dodajanje izdelka v košarico.
  Omogoča:
  - izbiro količine
  - validacijo zaloge
  - prikaz loading animacije
  - klic server actiona addToBasket
*/

import { faAngleDown, faAngleUp, faCartPlus, faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { addToBasket } from "../actions/basket";
import { useRouter } from "next/navigation";

/*
  Props:
  - product: izdelek iz baze (Sanity)
  - session: boolean, ali je uporabnik prijavljen
*/

const AddtoBasket = ({ product, session }: { product: any, session: boolean }) => {
    // Količina izdelkov za dodajanje
    const [quantity, changeQuantity] = useState(1);
    // Ali se trenutno dodaja v košarico (loading state)
    const [fillingBasket, setFillingBasket] = useState(false);
    // Index ikone za animacijo peščene ure
    const [iconIndex, setIconIndex] = useState(0);

    // Router za osvežitev strani
    const router = useRouter();

    // Ikone za animacijo med nalaganjem
    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

     /*
    Effect za animacijo ikone:
    - ko se začne dodajanje → menjava ikon
    - ko se konča → reset
  */
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
        /*
        Ob oddaji forme:
        - preprečimo refresh
        - preverimo prijavo
        - pokličemo server action
      */
            onSubmit={async (e) => {
                e.preventDefault();

                // Če uporabnik ni prijavljen ali že dodajamo → stop
                if (!session || fillingBasket) return;

                setFillingBasket(true);

                // Pripravimo podatke za server action
                const formData = new FormData(e.currentTarget);
                await addToBasket(formData);

                 // Končano dodajanje
                setFillingBasket(false);
                // Osvežimo podatke (košarica)
                router.refresh();
            }}
            className="addProductToBasketForm"
        >
            {/* Skriti input s slugom izdelka */}
            <input type="text" name="product" value={product.slug.current} readOnly hidden />

            <label htmlFor="quantity" className="text-center">Quantity:</label>
            {/* Kontrola količine */}
            <div className="bg-white rounded-md">
                {/* Povečaj količino */}
                <button
                    type="button"
                    onClick={() => changeQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="button changeProductQuantityButton"
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                {/* Prikaz količine */}
                <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-20 outline-none text-center"
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
            </div>

            {/* Gumb za dodajanje v košarico */}
            <button
                className="button disabled:cursor-not-allowed! disabled:opacity-75!"
                disabled={!session || fillingBasket}
                data-testid="add-to-basket"
            >
                Add to basket
                <FontAwesomeIcon className="ml-1" icon={fillingBasket ? hourglassIcons[iconIndex] : faCartPlus} />
            </button>
        </form>
    )
}
export default AddtoBasket;