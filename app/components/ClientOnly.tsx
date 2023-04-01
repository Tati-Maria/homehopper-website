'use client'
import { useEffect, useState } from "react";

// this is to fix the issue of the component rendering on the server side

interface ClientOnlyProps {
    children: React.ReactNode;
}

export default function ClientOnly({ children}: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
}

