import { FaArrowLeft } from "react-icons/fa6"; // For the "Back" button
import { useRouter } from "next/router"; // For navigation
import { PiCopyLight } from "react-icons/pi";
import { useQuery } from "react-query";
import { EscrowServices } from "../../services/escrow";

const EscrowDetails = () => {
  const router = useRouter();

  const {id}:any = router.query;
  console.log(id);

  const {data: EscrowData, isLoading} = useQuery(
    ["query-escrow-details", id],
   () => EscrowServices.getEscrowById(id),
    {
      onSuccess: (data: any) => {
        console.log(data.data);
      
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    })

  const data = {
    status: "In Progress",
    BuyerName: "Rachael Hudson",
    productName: "Nike Shoes",
    description: "Purchase of a Nike shoe",
    quantity: 1,
    amount: "₦15,000",
    phoneNumber: "080 0000 0000",
    email: "rachael@gmail.com",
    timeline: [
      { time: "03:00 PM", text: "Accept Escrow offer", action1: "Cancel payment", action: "Accept offer" },
      { time: "03:00 PM", text: "Mark as delivered", action: "Marked as delivered" },
      { time: "03:00 PM", text: "Request payment", action: "Request payment" },
      { time: "03:00 PM", text: "Escrow complete" },
    ],
  };

  return (
    <div className=" bg-gray-50 py-8 px-6 flex justify-center">
      <div className="w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-800"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Header */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Escrow Details</h3>
          <p className="text-sm text-gray-500">Review the details of this escrow below</p>
        </div>

        {/* Main Section */}
        <div className="mt-6 flex-wrap flex gap-6">
          {/* Left Section: Details */}
          <div className="w-[476px] bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            {/* Status */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900 rounded-full">
                <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                Pending
              </div>
            </div>

            {/* Other Details */}
            {[
              { label: "Buyer Name", value: data.BuyerName },
              {
                label: "Phone number",
                value: (
                  <div className="flex items-center gap-2">
                    {data.phoneNumber}
                    <PiCopyLight className="text-gray-400 cursor-pointer" />
                  </div>
                ),
              },
              { label: "Product name", value: data.productName },
              { label: "Description", value: data.description },
              { label: "Amount", value: data.amount },
              { label: "Quantity", value: data.quantity },
              {
                label: "Email",
                value: (
                  <div className="flex items-center gap-2">
                    {data.email}
                    <PiCopyLight className="text-gray-400 cursor-pointer" />
                  </div>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center ${index < 6 ? "border-b border-gray-200 pb-4 mb-4" : ""
                  }`}
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <div className="text-sm font-semibold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Right Section: Timeline */}
          <div className="w-[476px] bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            {/* <div className="flex items-start gap-4 relative">
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
                />
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
            </div> */}
            {data.timeline.map((item, index) => (
              <div key={index} className="relative flex items-start gap-4 ">
                {/* Checkbox & Line */}
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 appearance-none border border-blue-300 rounded-none"

                  />
                  {index < data.timeline.length - 1 && (
                    <div
                      style={{
                        height: "80px",
                        width: "1px",
                        borderLeft: "1px dashed #9DBCDC",
                      }}
                    />
                  )}
                </div>

                {/* Timeline Content */}
                <div className="">
                  <p className="text-sm font-semibold text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-500">Additional description for the event.</p>
                  {item.action && (
                    <button disabled={index !== 0} className="mt-2 disabled:bg-gray-400 px-3 mr-2 py-1 border bg-blue-500 text-sm text-white rounded-full">
                      {item.action}
                    </button>
                  )}
                  {item.action1 && (
                    <button  className="mt-2 px-3 py-1 border border-blue-500 text-sm rounded-full">
                      {item.action1}
                    </button>
                  )}
                </div>

                {/* Time */}
                <p className="text-xs text-[#5F738C] absolute right-0">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowDetails;
