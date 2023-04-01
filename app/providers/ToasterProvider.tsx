'use client'

import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
            style: {
                background: "#363636",
                color: "#fff",
            },
        }}
        />
    )
}

export default ToasterProvider;