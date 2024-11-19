import { FaArrowLeft } from "react-icons/fa6"; // For the "Back" button
import { useRouter } from "next/router"; // For navigation
import { PiCopyLight } from "react-icons/pi";

const EscrowDetails = () => {
  const router = useRouter();

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
      { time: "03:00 PM", text: "Accept Escrow offer", action1: "Cancel payment" },
      { time: "03:00 PM", text: "Mark as delivered", action: "Marked as delivered" },
      { time: "03:00 PM", text: "Request payment", action: "Request payment" },
      { time: "03:00 PM", text: "Escrow complete" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 flex justify-center">
      <div className="w-[1067px]">
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
        <div className="mt-6 flex gap-6">
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
                className={`flex justify-between items-center ${
                  index < 6 ? "border-b border-gray-200 pb-4 mb-4" : ""
                }`}
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <div className="text-sm font-semibold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Right Section: Timeline */}
          <div className="w-[476px] bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            {data.timeline.map((item, index) => (
              <div key={index} className="relative flex items-start gap-4 mb-6">
                {/* Checkbox & Line */}
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 appearance-none border border-blue-300 rounded-none"
                    
                  />
                  {index < data.timeline.length - 1 && (
                    <div
                      style={{
                        height: "60px",
                        width: "1px",
                        borderLeft: "2px dashed #9DBCDC",
                      }}
                    ></div>
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-500">Additional description for the event.</p>
                  {item.action && (
                    <button className="mt-2 px-3 py-1 border bg-gray-400 text-sm text-white rounded-full">
                      {item.action}
                    </button>
                  )}
                  {item.action1 && (
                    <button className="mt-2 px-3 py-1 border bg-blue-500 text-sm text-white rounded-full">
                      {item.action1}
                    </button>
                  )}
                </div>

                {/* Time */}
                <p className="absolute right-0 text-xs text-gray-500">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowDetails;
