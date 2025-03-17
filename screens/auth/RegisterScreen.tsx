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
import { AiOutlineExclamationCircle } from "react-icons/ai";



const validationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("*Email must be a valid address")
        .required("*Email is required"),
    password: Yup.string().trim()
        .required("*Password is required")
        .min(8, 'Must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Must contain at least one special character'),
    firstName: Yup.string().trim().required("*First name is required"),
    lastname: Yup.string().trim().required("*Last name is required"),
    bankCode: Yup.string().trim().required("*Bank is required"),
    accountNumber: Yup.string().trim().required("*Account number is required"),
});



const RegisterScreen = () => {
    const [bankName, setBankName] = useState<string>("");
    const router = useRouter()

    const userSignUpInfo = {
        "email": "",
        "phone": "",
        "password": "",
        "firstName": "",
        "lastname": "",
        "address": "Test address",
        "accountNumber": "",
        "bankCode": "",
        "backUpPhoneNumber": ""
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
        <div className="w-screen h-screen flex my-2 items-center justify-center">
            <div className='lg:w-[506px] px-3 '>
                <h5 className='text-sm text-[#5F738C]'>Get strarted</h5>
                <h3 className='text-xl font-bold text-[#1F2126]'>Create an account</h3>

                <div>
                    <FormikProvider value={form}>
                        <form className='my-6 w-full' onSubmit={form.handleSubmit}>
                            <div className='grid w-full gap-2 grid-cols-2'>
                                <div>
                                    <TextInput placeholder="Enter your first name" name='firstName' label='First name' />
                                </div>
                                <div>
                                    <TextInput placeholder="Enter your last name" name='lastname' label='Last name' />
                                </div>
                            </div>
                            <div className='my-4 w-full grid gap-2 grid-cols-2'>
                                <div className=''>
                                    <TextInput placeholder="Enter your phone number" name='phone' label='phone number' />
                                </div>

                                <div className=''>
                                    <TextInput placeholder="Enter your backup phone number" name='backUpPhoneNumber' label='phone number' />
                                </div>
                            </div>

                            <div className='my-4 w-full'>
                                <TextInput placeholder="Enter your email" type="email" name='email' label='email' />
                            </div>

                            <div className="w-full">
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

                            <div className='my-4 w-full'>
                                <TextInput  name='accountNumber' label='Account Number' type="number" placeholder="0123456789" />
                               <span className='text-xs mt-1 flex items-center gap-2 text-gray-500'><AiOutlineExclamationCircle /> Bank details are required in order to process a refund if a transaction fails</span> 
                            </div>



                            <div className='my-4 w-full'>
                                <TextInput name='password' type="password" label='password' placeholder="Enter your password" />
                            </div>
                            <Button isLoading={handleRegister.isLoading} disabled={!form.isValid} size='large' label='Sign Up' className='w-full  flex items-center !my-6 justify-center' />

                            <span className='my-4 text-sm'>Don’t have an account?<Link className='text-[#398DFA]' href={"/"}> Sign in</Link> </span>

                        </form>
                    </FormikProvider>
                </div>



            </div>

        </div>
    )
}

export default RegisterScreen