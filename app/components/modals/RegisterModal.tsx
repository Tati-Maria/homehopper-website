'use client'
//npm install axios <3 react-hook-form
import axios from "axios";
//icons
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {useCallback, useState} from "react";
//hooks
import useRegisterModal from "@/app/hooks/useRegisterModal";
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


//the actual component
export default function RegisterModal() {
    const registerModal = useRegisterModal();
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
        axios.post("/api/auth/register", data)
        .then(() => {
            setLoading(false);
            registerModal.onClose();
        }).catch((error) => {
            console.log(error.response.data.message);
            setLoading(false);
            setError(error.response.data.message);
        }).finally(() => {
            setLoading(false);
        })
    }

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
    )


    return (
        <Modal
        disabled={loading}
        isOpen={registerModal.isOpen}
        title="Register"
        onClose={registerModal.onClose}
        actionLabel="Continue"
        onSubmitted={handleSubmit(onSubmit)}
        body={bodyContent}
        />
    )
}