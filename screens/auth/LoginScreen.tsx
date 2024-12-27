import { FormikProvider, useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import TextInput from '../../components/FormInputs/TextInput2';
import { Button } from '../../components/Button/Button';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { AuthServices } from '../../services/auth';
import { AuthActions } from '../../zustand/auth.store';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


const validationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("*Email must be a valid address")
        .required("*Email is required"),
    password: Yup.string().trim()
        .required("*Password is required")
        .min(8, 'Must be at least 8 characters')
});
const LoginScreen = () => {
    const router = useRouter();
    const userSignUpInfo = {
        email: "",
        role: "BUYER",
        password: ""
    };
    const form = useFormik({
        initialValues: userSignUpInfo,
        validationSchema,
        onSubmit: (values) => {
            handleLogin.mutate(values)
        }
    })

    const handleLogin = useMutation(
        async (values: any) => {
            return AuthServices.login(values)
        },
        {
            onSuccess: (data) => {
                toast.success("login successfully")
                AuthActions.setProfile(data.data.account)
                AuthActions.setToken(data.data.jwt)
                router.push('/dashboard')
            },onError: (error: any) => {
                // console.log(error.response.data.message);
                toast.error(error.response.data.message)
            }
        }
    )
    return (
        <div className="w-full h-screen flex flex-row my-2 items-center justify-center">
            <div className='lg:w-[406px] w-[90%]  h-auto'>
                <h5 className='text-sm text-[#5F738C]'>Welcome</h5>
                <h3 className='text-xl font-bold text-[#1F2126]'>Sign in to continue</h3>

                <FormikProvider value={form}>
                    <form className='my-6' onSubmit={form.handleSubmit}>
                        <div>
                            <TextInput placeholder="Enter your email" type="email" name='email' label='email' />
                        </div>
                        <div className='my-4'>
                            <label htmlFor="role" className='block capitalize text-sm font-normal text-[#5F738C]'>Sign in as</label>
                            <select
                                id="role"
                                name="role"
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.role}
                                className='mt-1 block w-full h-[44px] bg-white border pl-3 pr-10 py-2 text-base border-gray-300  sm:text-sm rounded-md'
                            >
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                            </select>
                            {form.touched.role && form.errors.role ? (
                                <div className='text-red-500 text-sm'>{form.errors.role}</div>
                            ) : null}
                        </div>
                        <div className='my-4'>
                            <TextInput name='password' type="password" label='password' placeholder="Enter your password" />
                        </div>
                        <Button isLoading={handleLogin.isLoading} size='large' label='Sign in' className='w-full  flex items-center !my-6 justify-center' />

                        <span className='my-4 text-sm'>Don’t have an account?<Link className='text-[#398DFA]' href={"/create-account"}> Sign Up</Link> </span>

                    </form>
                </FormikProvider>

            </div>

        </div>
    )
}

export default LoginScreen