'use client'
//npm install axios <3 react-hook-form
import axios from "axios";
//icons
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
//hooks
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
//types for react-hook-form
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
//components
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import Input from "../inputs/Input";
import Button from "../common/Button";
//toast for notifications (npm i react-hot-toast)
import toast from "react-hot-toast";


//the actual component
export default function RegisterModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //form control
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        axios.post("/api/register", data)
        .then(() => {
            registerModal.onClose();
            toast.success('Account created successfully 😀');
            loginModal.onOpen();
        }).catch((error) => {
            toast.error('Something went wrong');
        }).finally(() => {
            setLoading(false);
        })
    }

    const toggleModal = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    } , [loginModal, registerModal]);  

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
            title="Welcome to HomeHopper!"
            subText="Create an account to get started."
            />
            <Input
            id='name'
            label='Name'
            type="text"
            disabled={loading}
            register={register}
            errors={errors}
            required 
            />
            <Input
            id='email'
            label='Email'
            type="email"
            disabled={loading}
            register={register}
            errors={errors}
            required 
            />
            <Input
            id='password'
            label='Password'
            type='password'
            disabled={loading}
            register={register}
            errors={errors}
            required 
            />
        </div>
    );

    const footerContent = (
        <div
        className='flex flex-col gap-4 mt-3'
        >
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')} 
            />
            
            <div
            className='flex justify-center items-center gap-2' 
            >
                <small>
                    Already have an account? <span
                    className='text-extra-violet underline cursor-pointer hover:opacity-80 transition-colors'
                    onClick={toggleModal}
                    >Login</span>
                </small>
            </div>
        </div>
    );


    return (
        <Modal
        disabled={loading}
        isOpen={registerModal.isOpen}
        title="Register"
        onClose={registerModal.onClose}
        actionLabel="Continue"
        onSubmitted={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}