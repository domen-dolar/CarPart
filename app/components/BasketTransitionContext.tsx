"use client";

import { createContext, useContext } from "react";

type BasketTransition = {
    isPending: boolean;
    startTransition: React.TransitionStartFunction;
};

export const BasketTransitionContext =
    createContext<BasketTransition | null>(null);

export const useBasketTransition = () => {
    const ctx = useContext(BasketTransitionContext);

    if (!ctx) {
        throw new Error("useBasketTransition must be used inside BasketClient");
    }
    
    return ctx;
};