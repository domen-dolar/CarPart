"use client";

/*
  Context za uporabo React useTransition stanja
  znotraj košarice.
  
  Omogoča:
  - komponentam kot so BasketItemQuantity, AddToBasket
    dostop do globalnega "pending" stanja
  - mehke UI posodobitve brez blokiranja
*/

import { createContext, useContext } from "react";

// Tip za context
type BasketTransition = {
    // Ali je tranzicija v teku
    isPending: boolean;
    // Funkcija za zagon tranzicije
    startTransition: React.TransitionStartFunction;
};

/*
  Context objekt
  - default: null (kar pomeni, da mora biti znotraj providerja)
*/
export const BasketTransitionContext =
    createContext<BasketTransition | null>(null);

/* Custom hook za enostaven dostop do contexta */
export const useBasketTransition = () => {
    const ctx = useContext(BasketTransitionContext);

    if (!ctx) {
        throw new Error("useBasketTransition must be used inside BasketClient");
    }
    
    return ctx;
};