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
import { useRouter } from 'next/router'
import { useAuth } from '../../zustand/auth.store'


const tabs = ['Active', 'Completed', 'Cancelled']
const HomeScreen = () => {
  const [details, setDetails] = useState<any>({})
  const [activetab, setActiveTab] = useState(tabs[0])
  const profile = useAuth((s) => s.profile)
  const { data, isLoading, refetch } = useFetchWithParams(
    ["query-all-escrow-page", {
      page: 0, size: 25,
    }],
    EscrowServices.getEscrow,
    {
      onSuccess: (data: any) => {
        console.log(data);
        setDetails(data)
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
    <div className='w-full max-w-[630px]'>
      {
        isLoading ?
          <div className='w-full flex justify-center'>
            <Spinner color='#000' /> </div> :
          <>
            <h3 className='text-[#1F2126] font-semibold'>Hi  {profile.firstName} 👋🏼</h3>
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

            <div className="flex gap-4 mb-8 w-full">
              <Link href="/dashboard/pay-with-escrow" className="flex-1">
                <div className="h-[120px] bg-white rounded-[10px] border border-[#E1E6ED] p-5">
                  <div className="flex items-center justify-between h-full">
                    <div className=''>
                    <h3 className="text-[#1F2126] font-semibold">Pay with Escrow</h3>
                    <p className="text-[#5F738C] text-sm">Make payment using secured escrow service</p>
                    </div>
                   
                    <div className="flex justify-end">
                      <div className="bg-[#398DFA] rounded-full p-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08" 
                            stroke="white" strokeWidth="1.5" strokeMiterlimit="10" 
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/dashboard/#receive-with-escrow" className="flex-1">
                <div className="h-[120px] bg-white rounded-[10px] border border-[#E1E6ED] p-5">
                  <div className="flex items-center justify-between h-full">
                    <div>
                    <h3 className="text-[#1F2126] font-semibold">Receive with Escrow</h3>
                    <p className="text-[#5F738C] text-sm">Make payment using secured escrow service</p>
                    </div>
                   
                    <div className="flex justify-end">
                      <div className="bg-[#7A33FF] rounded-full p-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08" 
                            stroke="white" strokeWidth="1.5" strokeMiterlimit="10" 
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className='w-full bg-white min-h-[210px]  p-5 rounded-[10px] border border-[#E1E6ED]'>
              <div className='grid md:grid-cols-2 grid-cols-1'>
                <TabBar onChange={(e) => setActiveTab(e)} tabs={tabs} />

              </div>

              <div className='flex  mt-2 gap-[18px] flex-col divide-y-[1px]'>
                {
                  details?.details && details?.details?.length === 0 ? <h3 className='text-sm text-center text-[#5F738C]'>No active escrow</h3> :

                  details && details?.details?.filter((items: any, i: number) => {
                      if (activetab === "Active") {
                        return items
                      } else if (activetab === "Completed") {
                        return items.escrow.status === "COMPLETED"
                      } else if (activetab === "Cancelled") {
                        return items.escrow.status === "CANCELED"
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
  const role = useAuth((state) => state.profile.role)
  const router = useRouter()
  return (
    <>
   
      <div onClick={() => router.push(`/dashboard/escrow-details/${details.escrow.uuid}`)} className='w-full  pt-[18px] cursor-pointer flex justify-between items-center h-[36px]'>
        <div> 
          <h3 className='text-sm text-[#1F2126] font-semibold '>{formatAmount(details.escrow.amount)}</h3>
          <h5 className='text-xs text-[#5F738C] '>{details.product.productName} - {role === "BUYER" ? `${details.product.seller.firstName} ${details.product.seller.lastName}` : `${details.product.buyer.firstName} ${details.product.buyer.lastName}` }</h5>
        </div>

        <div className='flex gap-6  justify-between items-center'>
          <Label label={details.escrow.status} />
          <FaArrowRight color='#5F738C' className='text-[#5F738C]' />

        </div>


      </div>
    </>

  )
}

export default HomeScreen