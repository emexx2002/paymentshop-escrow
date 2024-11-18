import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6'; // For the "Back" button
import { useRouter } from 'next/router'; // For navigation

const ViewBuyer = () => {
  const router = useRouter();

  // Example data for display (replace with actual API data if available)
  const data = {
    status: 'In Progress',
    productName: 'Nike Shoes',
    description: 'Purchase of a nike shoe',
    quantity: 1,
    amount: '₦15,000',
    vendorName: 'Abass Onibata',
    phoneNumber: '080 0000 0000',
    email: 'abasonibata@gmail.com',
    timeline: [
      { time: '0:00 PM', text: 'Escrow payment sent' },
      { time: '0:00 PM', text: 'Seller has accepted' },
      { time: '0:00 PM', text: 'Seller has delivered order' },
      { time: '0:00 PM', text: 'Pay seller to complete this order' },
      { time: '0:00 PM', text: 'Escrow complete' },
    ],
  };

  return (
    <div className="items-center justify-center">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-xs text-[#1F2126] font-semibold">
        <FaArrowLeft /> Back
      </button>

      {/* Escrow Details Header  */}
      <h3 className="text-xl text-[#1F2126] mt-4 font-semibold">Escrow Details</h3>
      <h5 className="text-sm text-[#5F738C] mb-4">Review the details of this escrow below</h5>

      <div className='w-[1067px] flex flex-row gap-6'>
        <div className="w-[476px] bg-white p-6 rounded-[10px] border border-[#E1E6ED]">

          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Status</h3>
            <div className="flex items-center px-3 py-1 rounded-full bg-[#FDE2BF] text-[#6D3F04] text-sm font-semibold gap-2">

              <span className="w-2 h-2 rounded-full bg-[#F79B24] inline-block"></span>

              <span>In-progress</span>
            </div>

          </div>

          {/* Product Details */}
          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Product Name</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">Nike Shoes</h3>
          </div> 
          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Description</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">
              Purchase of a Nike shoe
            </h3>
          </div>
          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Quantity</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">1</h3>
          </div>
          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Amount</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">₦15,000</h3>
          </div>
          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Vendor Name</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">Abass Onibata</h3>
          </div>
          <div className="flex justify-between items-center border-b border-[#E1E6ED] pb-2 mb-5">
            <h3 className="text-sm text-[#5F738C]">Phone Number</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">080 0000 0000</h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-[#5F738C]">Email</h3>
            <h3 className="text-sm text-[#1F2126] font-semibold">
              abasonibata@gmail.com
            </h3>
          </div>
        </div>


        {/* Timeline */}
        <div className="w-[476px] bg-white rounded-[10px] border border-[#E1E6ED] relative p-6">
          <div className="flex items-start gap-4 relative">
            <div className="flex flex-col items-center">
              <input
                type="checkbox"
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
              <button className="mt-2 px-3 py-1 border border-[#E1E6ED] text-sm text-[#1F2126] rounded-xl">
                Cancel payment
              </button>
            </div>
            <h5 className="text-xs text-[#5F738C] absolute right-0">03:00 PM</h5>
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
              <h3 className="text-sm text-[#1F2126] font-semibold">Seller has accepted</h3>
              <h5 className="text-xs text-[#5F738C]">The seller has accepted your escrow payment.</h5>
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


    </div>
  );
};

export default ViewBuyer;
