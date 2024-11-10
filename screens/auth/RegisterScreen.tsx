import { FormikProvider, useFormik } from 'formik';
import React, { useReducer, useState } from 'react'
import * as Yup from "yup";
import TextInput from '../../components/FormInputs/TextInput2';
import { Button } from '../../components/Button/Button';
import Link from 'next/link';
import bank from "../../utils/banks.json";
import { AuthServices } from '../../services/auth';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';



const validationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("*Email must be a valid address")
        .required("*Email is required"),
    password: Yup.string().trim()
        .required("*Password is required")
        .min(8, 'Must be at least 8 characters'),
    firstName: Yup.string().trim().required("*First name is required"),
    lastname: Yup.string().trim().required("*Last name is required"),
    bankCode: Yup.string().trim().required("*Bank is required"),
    accountNumber: Yup.string().trim().required("*Account number is required"),
});



const RegisterScreen = () => {
    const [bankName, setBankName] = useState<string>("");
    const router = useRouter()

    const userSignUpInfo = {
        "role": "BUYER",
        "email": "",
        "phone": "",
        "password": "",
        "firstName": "",
        "lastname": "",
        "address": "Test address",
        "accountNumber": "",
        "bankCode": ""
    };
    const form = useFormik({
        initialValues: userSignUpInfo,
        validationSchema,
        onSubmit: (values) => {
            handleRegister.mutate(values)
        }
    })

    const handleRegister = useMutation(
        async (values: any) => {
            return AuthServices.register(values)
        },
        {
            onSuccess: (data) => {
                toast.success("regristration succefull")
                router.push('/')
            },
            onError: (error: any) => {
                // console.log(error.response.data.message);
                toast.error(error.response.data.message)
            }
        }
    )

    console.log(form.errors)
    return (
        <div className="w-full h-screen flex flex-row my-2 items-center justify-center">
            <div className='lg:w-[406px] px-4 md:px-0  h-auto'>
                <h5 className='text-sm text-[#5F738C]'>Get strarted</h5>
                <h3 className='text-xl font-bold text-[#1F2126]'>Create an account</h3>

                <FormikProvider value={form}>
                    <form className='my-6' onSubmit={form.handleSubmit}>
                        <div className='grid gap-2 grid-cols-2'>
                            <div>
                                <TextInput placeholder="Enter your first name" name='firstName' label='First name' />
                            </div>
                            <div>
                                <TextInput placeholder="Enter your last name" name='lastname' label='Last name' />
                            </div>
                        </div>
                        <div className='my-4'>
                            <TextInput placeholder="Enter your email" name='phone' label='phone number' />
                        </div>
                        <div className='my-4'>
                            <TextInput placeholder="Enter your email" type="email" name='email' label='email' />
                        </div>
                        <div className='grid my-4 gap-2 grid-cols-2'>
                            <div className="">
                                <label className="text-[14px] mb-2" htmlFor="bank-name">
                                    Bank Name
                                </label>
                                <select
                                    id="bank-name"
                                    // value={bankName}
                                    {...form.getFieldProps('bankCode')}
                                    // name='bankCode'
                                    className="w-full border bg-white  rounded-[10px] text-sm px-3 py-2 h-[44px]"
                                // onChange={handleBankName}
                                >
                                    <option value="">Select Bank</option>
                                    {bank.map(
                                        (
                                            {
                                                code,
                                                name,
                                            }: { code: string; name: string; },
                                            index: number
                                        ) => (
                                            <option key={index} value={code}>
                                                {name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <TextInput name='accountNumber' label='Account Number' type="number" placeholder="0123456789" />

                        </div>
                        <div className='my-4'>
                            <TextInput name='password' type="password" label='password' placeholder="Enter your password" />
                        </div>
                        <Button isLoading={handleRegister.isLoading} disabled={!form.isValid} size='large' label='Sign Up' className='w-full  flex items-center !my-6 justify-center' />

                        <span className='my-4 text-sm'>Don’t have an account?<Link className='text-[#398DFA]' href={"/"}> Sign in</Link> </span>

                    </form>
                </FormikProvider>

            </div>

        </div>
    )
}

export default RegisterScreen