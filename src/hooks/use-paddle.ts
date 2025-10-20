"use client";

import {initializePaddle, Paddle} from "@paddle/paddle-js";
import {useEffect, useState} from "react";
import {useUpdatePaddleCheckoutMutation} from "@/app/(company)/company-settings/billing-and-subscription/_lib/slice";

export const usePaddle = () => {
    const [paddle, setPaddle] = useState<Paddle | undefined>();
    const [
        updatePaddleCheckout,
        {
            data: updatePaddleCheckoutData,
            isLoading: isUpdatePaddleCheckoutLoading,
            isSuccess: isUpdatePaddleCheckoutSuccess,
        },
    ] = useUpdatePaddleCheckoutMutation();

    useEffect(() => {
        initializePaddle({
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
            environment: "sandbox",
            eventCallback: (data) => {

                if (data.name === "checkout.completed") {
                    console.log("OOO" + JSON.stringify(data));

                    updatePaddleCheckout({transaction_id: data.data!.transaction_id});
                }
            }
        }).then((paddleInstance) => {
            if (paddleInstance) {
                setPaddle(paddleInstance);
            }
        });
    }, []);

    return paddle;
};