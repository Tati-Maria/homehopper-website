'use client'
//npm install axios <3 react-hook-form
import axios from "axios";
//icons
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {useCallback, useState} from "react";
//hooks
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation";
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
export default function LoginModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //form control
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((response) => {
            if(response?.error) {
                toast.error(response.error);
            } else {
                toast.success('Logged in successfully');
                router.refresh();
                loginModal.onClose();
            }
        }).catch((error) => {
            toast.error('Something went wrong');
        }).finally(() => {
            setLoading(false);
        })
    }

    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    } , [loginModal, registerModal]);    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
            title="Welcome Back!"
            subText="Login to your account to continue"
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
                    Do not have an account yet?<span
                    className='text-extra-violet underline cursor-pointer hover:opacity-80 transition-colors'
                    onClick={toggleModal}
                    >Register</span>
                </small>
            </div>
        </div>
    );


    return (
        <Modal
        disabled={loading}
        isOpen={loginModal.isOpen}
        title="Login"
        onClose={loginModal.onClose}
        actionLabel="Continue"
        onSubmitted={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}