import { ReactNode } from "react";

interface FlexLayoutProps {
    children: ReactNode
}

export default function FlexLayout({children}: FlexLayoutProps) {
    return (
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {children}
        </div>
    )
}