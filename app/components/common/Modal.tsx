'use client'
import { useEffect, useState, useCallback } from "react";
import Button from "./Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitted: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmitted,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    //to animate the modal that's why I used setTimeout
    const handleClose = useCallback(() => {
        if(disabled) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    //submit button
    const handleSubmitted = useCallback(() => {
        if(disabled) return;
        onSubmitted();
    }, [disabled, onSubmitted]);

    //prev and next button
    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);

    if(!isOpen) return null;

  return (
    <>
    <div
    className="
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    bg-neutral-800/70
    "
    >
        <div
        className="
        relative 
        w-full 
        md:w-4/6 
        lg:w-3/6 
        xl:w-2/5 
        my-6 
        mx-auto 
        h-full 
        md:h-auto"
        >
            {/*content*/}
            <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
            >
                
                <div
                className="
                translate
                h-full
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none"
                >
                    {/*header*/}
                    <div
                    className="
                    flex
                    items-center
                    p-6
                    rounded-t
                    justify-center
                    relative
                    border-b-[1px]
                    "
                    >
                        <button
                        title="Close"
                        onClick={handleClose}
                        className='p-1 border-0 hover:opacity-70 transition absolute left-9'
                        >
                            <svg
                            className="w-6 h-6 text-neutral-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </button>
                        <div
                        className="
                        text-lg
                        font-semibold"
                        >
                            {title}
                        </div>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        {body}
                    </div>
                    {/*footer*/}
                    <div
                    className="flex flex-col gap-2 p-6"
                    >
                        <div
                        className='flex items-center gap-4 w-full' 
                        >
                            {secondaryAction && secondaryActionLabel && (
                                <Button
                                outline 
                                label={secondaryActionLabel}
                                disabled={disabled}
                                onClick={handleSecondaryAction}
                                />
                            )}
                            <Button 
                            label={actionLabel}
                            disabled={disabled}
                            onClick={handleSubmitted}
                            />
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Modal;