"use client";

import { useTransition } from "react";
import { BasketTransitionContext } from "./BasketTransitionContext";

const BasketClient = ({ children }: { children: React.ReactNode }) => {
    const [isPending, startTransition] = useTransition();

    return (
        <BasketTransitionContext.Provider
        value={{ isPending, startTransition }}
        >
        {children}
        </BasketTransitionContext.Provider>
    )
}
export default BasketClient;