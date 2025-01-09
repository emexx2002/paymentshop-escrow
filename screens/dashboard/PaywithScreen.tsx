import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import StepComponent from '../../components/stepComponent/StepComponent'
import { useRouter } from 'next/router';
import { FormikProvider, useFormik } from 'formik';
import TextInput from '../../components/FormInputs/TextInput2';
import FileUpload from '../../components/FormInputs/FIleUpload2';
import { Button } from '../../components/Button/Button';
import { useMutation } from 'react-query';
import { EscrowServices } from '../../services/escrow';
import Modal from '../../components/Modal/Modal';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';

const PaywithScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  const [details, setDetails] = useState<any>({})


  const handleStepClick = (step: any) => {
    if (step < 1) {
      setCurrentStep(1);
      router.back()
    } else setCurrentStep(step);

  };

  const form = useFormik({
    initialValues: {
      "productName": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "totalAmount": 0,
      "imageUrl": "",
      "sellerFirstName": "",
      "sellerLastName": "",
      "sellerPhone": "",
      "sellerEmail": "",
      "expectedDeliveryDate": ""
    },
    onSubmit: (values) => {
      const dateValue = form.values.expectedDeliveryDate; // e.g., "2025-01-16"
      const formattedDate = `${dateValue} 00:00:00`;
      // Create a Date object


      // console.log(isoString);
      const body = {
        ...values,
        expectedDeliveryDate: formattedDate
      }
      handleCreate.mutate(body)
    }
  })

  const handleCreate = useMutation(
    async (values: any) => {
      return EscrowServices.createEscrow(values)
    },
    {
      onSuccess: (data) => {
        toast.success(`payment sent to ${form.values.sellerEmail}`)
        form.resetForm()
        setDetails(data.data.data)
        setOpen(true)
        // router.push('/dashboard')
      },
      onError: (error: any) => {
        toast.error(
          error.response.data.message
        )
      }
    }
  )

  const handleTransferMade = () => {
      setOpen(false)
        router.push('/dashboard')

  }

  return (
    <div className='w-full max-w-[630px]' >
      <Modal open={open} onClick={() => setOpen(false)}>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <h3 className='text-base text-center text-[#1F2126] font-semibold '>Payment Details</h3>

          <h3 className='text-xl text-center '>Amount: NGN{details.totalAmount}</h3>
          <div className='flex items-center gap-2'>
            <h3 className='text-xl text-center '>Account Number: {details.virtualAccountNumber}</h3>
            <button onClick={() => navigator.clipboard.writeText(details.virtualAccountNumber)}> <FaCopy /></button>
          </div>

          <h5>Account Name: {details.virtualAccountName}</h5>
          <h3>Bank: {details.virtualAccountBank}</h3>

          <Button onClick={handleTransferMade} label='I have made the transfer' />

        </div>

      </Modal>
      <button onClick={() => router.back()} className='flex px-3 py-[10px] text-xs text-[#1F2126] font-semibold -mt-2 items-center gap-2'> <FaArrowLeft /> Back</button>

      <h3 className='text-xl text-[#1F2126] mt-8 font-semibold'>Pay with Escrow</h3>
      <h5 className='text-sm text-[#5F738C] '>View and manage your escrow activities</h5>

      <div className='my-4'>
        <StepComponent currentStep={currentStep} onStepClick={handleStepClick} />

      </div>

      <div className='w-full p-3 md:p-5 rounded-[10px] bg-white'>
        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            {
              currentStep === 1 && (
                <div>
                  <h3 className='text-base font-semibold text-[#1F2126]'>Product Details</h3>
                  <h5 className='text-sm text-[#5F738C]'>Provide the product details below</h5>

                  <div className='my-6 flex-col flex gap-5'>
                    <TextInput name='productName' label='Product Name' placeholder="Enter product name" />
                    <TextInput name='description' label='Description' placeholder="Enter product description" />
                    <div className='grid grid-cols-2 gap-5'>
                      <div className="">
                        <label className="text-[14px] mb-2" htmlFor="bank-name">
                          Quantity
                        </label>
                        <select
                          id=""
                          // value={bankName}
                          {...form.getFieldProps('quantity')}
                          // name='bankCode'
                          className="w-full border bg-white  rounded-[10px] text-sm px-3 py-2 h-[44px]"
                        // onChange={handleBankName}
                        >
                          <option value="">Select Quantity</option>
                          {[...Array(100)].map(
                            (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <TextInput name='totalAmount' label='Total Amount' placeholder="NGN" />

                    </div>
                    <TextInput name="expectedDeliveryDate" type="date" placeholder="Enter Date" label='Expected Delivery Date' />
                    <FileUpload name='imageUrl' />
                  </div>
                </div>
              )
            }

            {
              currentStep === 2 && (
                <div>
                  <h3 className='text-base font-semibold text-[#1F2126]'>Vendor's Details</h3>
                  <h5 className='text-sm text-[#5F738C]'>Provide the vendor's details below</h5>

                  <div className='my-6 flex-col flex gap-5'>
                    <div className='grid gap-2 grid-cols-2'>
                      <div>
                        <TextInput placeholder="Enter vendor's first name" name='sellerFirstName' label='First name' />
                      </div>
                      <div>
                        <TextInput placeholder="Enter vendor's last name" name='sellerLastName' label='Last name' />
                      </div>
                    </div>
                    <div className=''>
                      <TextInput placeholder="Enter vendor's phone number" name='sellerPhone' label='phone number' />
                    </div>
                    <div className=''>
                      <TextInput placeholder="Enter vendor's email" type="email" name='sellerEmail' label='email' />
                    </div>
                  </div>
                </div>
              )
            }

            {
              currentStep === 3 && (
                <div className='w-full'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-base text-[#1F2126] font-semibold '>Summary</h3>
                      <h5 className='text-sm text-[#5F738C]'>Review the details of this escrow</h5>
                    </div>

                  </div>

                  <h3 className='mt-8 mb-2 text-sm text-[#5F738C] font-semibold'>Product Details</h3>

                  <div className='px-[15px] w-full flex flex-col divide-y bg-[#F9FBFC] rounded-[10px] '>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Product name</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.productName}</h3>
                    </div>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Description</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.description}</h3>
                    </div>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Quantity</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.quantity}</h3>
                    </div>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Amount</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.totalAmount}</h3>
                    </div>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Expected Delivery Date</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.expectedDeliveryDate}</h3>
                    </div>
                  </div>
                  <h3 className='mt-8 mb-2 text-sm text-[#5F738C] font-semibold'>Vendor's Details</h3>
                  <div className='px-[15px] mb-8 w-full flex flex-col divide-y bg-[#F9FBFC] rounded-[10px] '>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Vendor's name</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.sellerFirstName} {form.values.sellerLastName}</h3>
                    </div>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Phone Number</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.sellerPhone}</h3>
                    </div>
                    <div className='flex py-[15px] items-center justify-between'>
                      <h3 className='text-sm text-[#5F738C]'>Email</h3>
                      <h3 className='text-sm text-[#1F2126] font-semibold'>{form.values.sellerEmail}</h3>
                    </div>
                  </div>

                  <div className='flex mb-4 items-center gap-2'>
                    <input onClick={() => setIsAgreed(isAgreed => !isAgreed)} type='checkbox' />
                    <h3 className='text-xs '>I agree to the Terms and Conditions of the escrow service</h3>
                  </div>


                </div>
              )
            }

            <div className='flex items-center justify-between'>
              <Button type='button' label='cancel' onClick={() => handleStepClick(currentStep - 1)} className='bg-white border px-6 !text-[#1F2126]' variant='outlined' />
              {
                currentStep < 3 ? (
                  <Button className='px-6' onClick={() => handleStepClick(currentStep + 1)} label='continue' type='button' />) :
                  (
                    <Button isLoading={handleCreate.isLoading} className='px-6' disabled={!isAgreed && form.isValid} label='Create escrow payment' type='submit' />

                  )

              }


            </div>
          </form>


        </FormikProvider>

      </div>

    </div>
  )
}

export default PaywithScreen