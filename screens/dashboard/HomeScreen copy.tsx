import React, { useEffect, useState } from 'react'
import TabBar from '../../components/TabBar/TabBar'
import Label from '../../components/Label/Label'
import { FaArrowRight } from "react-icons/fa6"
import Modal from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import StepComponent from '../../components/stepComponent/StepComponent'
import Link from 'next/link'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { EscrowServices } from '../../services/escrow'
import Spinner from '../../components/spinner/Spinner'
import { formatAmount } from '../../utils/Helpfunctions'


const tabs = ['Active', 'Completed', 'Cancelled']
const HomeScreen = () => {
  const [details, setDetails] = useState<any>({})
  const [activetab, setActiveTab] = useState(tabs[0])
  const { data, isLoading, refetch } = useFetchWithParams(
    ["query-all-escrow-page", {
      page: 1, size: 25,
    }],
    EscrowServices.getEscrow,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
        setDetails(data.data)
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  useEffect(() => {
    refetch()
  }, [])

  // console.log(details?.totalEscrowValue)

  return (
    <div className='w-full'>
      {
        isLoading ?
          <div className='w-full flex justify-center'>
            <Spinner color='#000' /> </div> :
          <>
            <h3 className='text-[#1F2126] font-semibold'>Hi Rachael 👋🏼</h3>
            <h5 className='text-sm text-[#5F738C] '>View and manage your escrow activities</h5>

            <div className="w-full mt-10 mb-8 bg-[url('/assets/vector.svg')] h-[142px] bg-no-repeat bg-right rounded-[10px] bg-[#1F2126] p-6">
              <h3 className='text-sm text-white'>Total Active Escrow</h3>

              <div className='flex mt-6 items-center gap-[50px] md:gap-[72px] flex-nowrap'>
                <div>
                  <h3 className='text-[#AAB7C6] text-sm'>Value</h3>
                  <span className='text-xl text-white font-semibold'>{formatAmount(details?.totalEscrowValue)}</span>
                </div>
                <div>
                  <h3 className='text-[#AAB7C6] text-sm'>Volume</h3>
                  <span className='text-xl text-white font-semibold'>{details?.totalEscrowVolume}</span>
                </div>
              </div>

            </div>

            <Link href={"/dashboard/pay-with-escrow"}>
              <div className='w-full mb-8 h-[71px] bg-white flex justify-between items-center px-5 rounded-[10px] border border-[#E1E6ED]'>
                <div>
                  <h3 className='text-[#1F2126] font-semibold'>Pay with Escrow</h3>
                  <h5 className='text-[#5F738C] text-sm'>Make payment using secured escrow service</h5>

                </div>

              </div>
            </Link>



            <div className='w-full bg-white min-h-[210px]  p-5 rounded-[10px] border border-[#E1E6ED]'>
              <div className='grid md:grid-cols-2 grid-cols-1'>
                <TabBar onChange={(e) => setActiveTab(e)} tabs={tabs} />

              </div>

              <div className='flex  mt-2 gap-[18px] flex-col divide-y-[1px]'>
                {
                  details.details && details.details.length === 0 ? <h3 className='text-sm text-center text-[#5F738C]'>No active escrow</h3> :

                  details.details && details.details.filter((items: any, i: number) => {
                      if (activetab === "Active") {
                        return items
                      } else if (activetab === "Completed") {
                        return items.status === "Completed"
                      } else if (activetab === "Cancelled") {
                        return items.status === "Cancelled"
                      }


                    }).map((item: any, i: number) => (
                      <EscrowInfo details={item} />
                    ))
                }


              </div>

            </div>
          </>

      }



    </div>
  )
}

const EscrowInfo = ({ details }: { details: any }) => {
  const [open, setIsOpen] = useState(false)
  return (
    <>
      <Modal open={open} onClick={() => setIsOpen(false)}>
        <div className='md:w-[620px] h-[514px]'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-base text-[#1F2126] font-semibold '>Escrow details</h3>
              <h5 className='text-sm text-[#5F738C]'>Review the details of this escrow below</h5>
            </div>
            {/* <Label label='in-progress' /> */}
          </div>

          <div className='px-[15px] mt-8 w-full flex flex-col divide-y bg-[#F9FBFC] rounded-[10px] '>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Product name</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>Nike</h3>
            </div>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Description</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>Purchase of a nike shoe</h3>
            </div>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Quantity</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>1</h3>
            </div>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Amount</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>₦30,000.00</h3>
            </div>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Vendor's name</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>Abass Onibata</h3>
            </div>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Phone Number</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>080 0000 0000</h3>
            </div>
            <div className='flex py-[15px] items-center justify-between'>
              <h3 className='text-sm text-[#5F738C]'>Email</h3>
              <h3 className='text-sm text-[#1F2126] font-semibold'>abasonibata@gmail.com</h3>
            </div>
          </div>

          <Button onClick={() => setIsOpen(false)} label='close' className='mt-8 px-6 ml-auto' />

        </div>

      </Modal>
      <div onClick={() => setIsOpen(true)} className='w-full  pt-[18px] cursor-pointer flex justify-between items-center h-[36px]'>
        <div>
          <h3 className='text-sm text-[#1F2126] font-semibold '>{formatAmount(details.amount)}</h3>
          <h5 className='text-xs text-[#5F738C] '>Abass Shoes</h5>
        </div>

        <div className='flex gap-6  justify-between items-center'>
          {/* <Label label='in-progress' /> */}
          <FaArrowRight color='#5F738C' className='text-[#5F738C]' />

        </div>


      </div>
    </>

  )
}

export default HomeScreen