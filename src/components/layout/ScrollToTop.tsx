"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // If there is no hash, scroll to top
        // If there is a hash, let the browser handle the anchor navigation
        if (!window.location.hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
        }
    }, [pathname]);

    return null;
}
