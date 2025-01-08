import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6'; // For the "Back" button
import { useRouter } from 'next/router'; // For navigation
import { useMutation, useQuery } from 'react-query';
import { EscrowServices } from '../../services/escrow';
import Spinner from '../../components/spinner/Spinner';
import Label from '../../components/Label/Label';

const ViewBuyer = () => {
  const router = useRouter();


  const { id }: any = router.query;
  console.log(id);

  const { data: EscrowData, isLoading, refetch } = useQuery(
    ["query-escrow-details-id", id],
    () => EscrowServices.getEscrowById(id),
    {
      onSuccess: (data: any) => {
        console.log(data.data);

      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    })


    const handleCancelPayment = useMutation(async () => {
      await EscrowServices.buyerCancelEscrow(id);
      
    }, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.log(error);  
      }
    }
  
  )

  const handleReleasePayment = useMutation(async () => {
    await EscrowServices.releaseEscrowPayment(id);
    
  } , {      
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);  
    }
  }
)

  // Example data for display (replace with actual API data if available)
  console.log(EscrowData)

  return (
    <div className="items-center justify-center">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-xs text-[#1F2126] font-semibold">
        <FaArrowLeft /> Back
      </button>

      {/* Escrow Details Header  */}
      <h3 className="text-xl text-[#1F2126] mt-4 font-semibold">Escrow Details</h3>
      <h5 className="text-sm text-[#5F738C] mb-4">Review the details of this escrow below</h5>

      {
        isLoading ?
          <div className='w-full flex justify-center'>
            <Spinner color='#000' /> </div> : <div className='flex-wrap flex justify-center gap-6'>
            <div className="w-[476px] bg-white p-6 rounded-[10px] border border-[#E1E6ED]">

              <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
                <h3 className="text-sm text-[#5F738C]">Status</h3>
                <Label label={EscrowData?.data?.status} />

              </div>

              {/* Product Details */}
              <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
                <h3 className="text-sm text-[#5F738C]">Product Name</h3>
                <h3 className="text-sm text-[#1F2126] font-semibold">{EscrowData?.data?.productName}</h3>
              </div>
              <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
                <h3 className="text-sm text-[#5F738C]">Description</h3>
                <h3 className="text-sm text-[#1F2126] font-semibold">
                  {EscrowData?.data?.description}
                </h3>
              </div>
              <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
                <h3 className="text-sm text-[#5F738C]">Quantity</h3>
                <h3 className="text-sm text-[#1F2126] font-semibold">{EscrowData?.data?.quantity}</h3>
              </div>
              <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
                <h3 className="text-sm text-[#5F738C]">Amount</h3>
                <h3 className="text-sm text-[#1F2126] font-semibold">₦{EscrowData?.data?.amount.toLocaleString()}</h3>
              </div>
              <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
                <h3 className="text-sm text-[#5F738C]">Vendor Name</h3>
                <h3 className="text-sm text-[#1F2126] font-semibold">{EscrowData?.data?.sellerFirstName} {EscrowData?.data?.sellerLastName}</h3>
              </div>
              {/* <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Phone Number</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">080 0000 0000</h3>
          </div> */}
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-[#5F738C]">Email</h3>
                <h3 className="text-sm text-[#1F2126] font-semibold">
                  {EscrowData?.data?.sellerEmail}
                </h3>
              </div>
            </div>


            {/* Timeline */}
            <div className="w-[476px] bg-white rounded-[10px] border border-[#E1E6ED] relative p-6">
              <div className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    checked={EscrowData?.data?.status === "CANCELLED" ? false : true}
                    className="w-5 h-5 z-10 relative appearance-none border border-[#9DBCDC] rounded checked:bg-[#29B32F] checked:border-[#29B32F] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                    readOnly
                  />
                  <div
                    style={{
                      height: "80px",
                      width: "1px",
                      borderLeft: "1px dashed #9DBCDC",
                    }}
                  ></div>
                </div>
                <div>
                  <h3 className="text-sm text-[#1F2126] font-semibold">Escrow payment sent</h3>
                  <h5 className="text-xs text-[#5F738C]">
                    We have sent the escrow payment to the seller.
                  </h5>
                  <button onClick={() => handleCancelPayment.mutate()}  disabled={handleCancelPayment.isLoading}  className="mt-2 px-3 py-1 border border-[#E1E6ED] text-sm text-[#1F2126] rounded-xl">
                   {handleCancelPayment.isLoading && <Spinner height={12} width={12} />} Cancel payment
                  </button>
                </div>
                <h5 className="text-xs text-[#5F738C] absolute right-0">03:00 PM</h5>
              </div>
              <div className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">

                  <input
                    type="checkbox"
                    checked={EscrowData?.data?.status === "ACCEPTED"}
                    className="w-5 h-5 z-10 relative appearance-none border border-[#9DBCDC] rounded checked:bg-[#29B32F] checked:border-[#29B32F] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                    readOnly
                  />
                  <div
                    style={{
                      height: "40px",
                      width: "1px",
                      borderLeft: "1px dashed #9DBCDC",
                    }}
                  ></div>
                </div>
                <div>
                  <h3 className="text-sm text-[#1F2126] font-semibold">Seller has accepted</h3>
                  <h5 className="text-xs text-[#5F738C]">The seller has accepted your escrow payment.</h5>
                </div>
                <h5 className="text-xs text-[#5F738C] absolute right-0">05:00 PM</h5>
              </div>
              <div className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    checked={EscrowData?.data?.status === "DELIVERED"}
                    className="w-5 h-5 z-10 relative appearance-none border border-[#9DBCDC] rounded checked:bg-[#29B32F] checked:border-[#29B32F] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                    readOnly
                  />
                  <div
                    style={{
                      height: "40px",
                      width: "1px",
                      borderLeft: "1px dashed #9DBCDC",
                    }}
                  ></div>
                </div>
                <div>
                  <h3 className="text-sm text-[#1F2126] font-semibold">Seller has delivered order</h3>
                  <h5 className="text-xs text-[#5F738C]">Your order has been delivered.</h5>
                </div>
                <h5 className="text-xs text-[#5F738C] absolute right-0">05:00 PM</h5>
              </div>
              <div className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 z-10 relative appearance-none border border-[#9DBCDC] rounded checked:bg-[#29B32F] checked:border-[#29B32F] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                    readOnly
                  />
                  <div
                    style={{
                      height: "40px",
                      width: "1px",
                      borderLeft: "1px dashed #9DBCDC",
                    }}
                  ></div>
                </div>
                <div>
                  <h3 className="text-sm text-[#1F2126] font-semibold">Pay seller to complete this order</h3>
                  <h5 className="text-xs text-[#5F738C]">Tap on the button below to complete this order.</h5>
                  {
                    EscrowData?.data?.status === "DELIVERED" &&
                    <button onClick={() => handleReleasePayment.mutate()}  disabled={handleReleasePayment.isLoading}  className="mt-2 px-3 py-1 border border-[#E1E6ED] bg-blue-500 text-sm text-white bg-primary rounded-xl">
                   {handleReleasePayment.isLoading && <Spinner height={12} width={12} />} Release payment
                  </button>
                  }
                  
                </div>
                <h5 className="text-xs text-[#5F738C] absolute right-0">05:00 PM</h5>
              </div>
              <div className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 z-10 relative appearance-none border border-[#9DBCDC] rounded checked:bg-[#29B32F] checked:border-[#29B32F] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:text-center"
                    readOnly
                  />
                </div>
                <div>
                  <h3 className="text-sm text-[#1F2126] font-semibold">Escrow complete</h3>
                  <h5 className="text-xs text-[#5F738C]">This escrow payment has been completed.</h5>
                </div>
                <h5 className="text-xs text-[#5F738C] absolute right-0">05:00 PM</h5>
              </div>
            </div>
          </div>
      }




    </div>
  );
};

export default ViewBuyer;
