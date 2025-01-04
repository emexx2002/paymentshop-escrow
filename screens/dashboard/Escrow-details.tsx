import { FaArrowLeft } from "react-icons/fa6"; // For the "Back" button
import { useRouter } from "next/router"; // For navigation
import { PiCopyLight } from "react-icons/pi";
import { useMutation, useQuery } from "react-query";
import { EscrowServices } from "../../services/escrow";

const EscrowDetails = () => {
  const router = useRouter();

  const {id}:any = router.query;
  console.log(id);

  const {data: EscrowData, isLoading, refetch} = useQuery(
    ["query-escrow-details-id2", id],
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
      { time: "03:00 PM", text: "Accept Escrow offer", action1: "Cancel payment", action: "Accept offer", action1Func: () => handleCancel.mutate(), actionFunc: () => handleAccept.mutate(), checked: ["ACCEPTED", "DELIVERED"].includes(EscrowData?.data?.status) ? true : false },
      { time: "03:00 PM", text: "Mark as delivered", action: "Marked as delivered", actionFunc: () => handleMarkDelivered.mutate(), checked: EscrowData?.data?.status === "DELIVERED" ? true : false },
      // { time: "03:00 PM", text: "Request payment", action: "Request payment", actionFunc: () => console.log("Request Payment") },
      { time: "03:00 PM", text: "Escrow complete", checked: EscrowData?.data?.status === "COMPLETED" ? true : false },
    ],
  };

  const handleCancel = useMutation(async () => {
    const body = {
      action: "cancel",
    }
    await EscrowServices.sellerCancelOrAcceptEscrow(id, body);

  }, {
    onSuccess: () => {
      console.log("Escrow cancelled");
      refetch()
    }
  });

  const handleAccept = useMutation(async () => {
    const body = {
      action: "accept",
    }
    await EscrowServices.sellerCancelOrAcceptEscrow(id, body);

  }, {
    onSuccess: () => {
      console.log("Escrow cancelled");
      refetch()
    }
  });

  const handleMarkDelivered = useMutation(async () => {
    await EscrowServices.setEscrowDelivered(id);

  }, {
    onSuccess: () => {
      console.log("Marked as delivered");
      refetch()
    }
  })

  // const handleRequestPayment = useMutation(async () => {
  //   await EscrowServices.(id);  

  // }, {
  //   onSuccess: () => {
  //     console.log("Payment requested");
  //     refetch()
  //   }
  // })

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
                {EscrowData?.data?.status}
              </div>
            </div>

            {/* Other Details */}
            {[
              { label: "Buyer Name", value: EscrowData?.data?.status },
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
              { label: "Description", value: EscrowData?.data?.description },
              { label: "Amount", value: `₦${EscrowData?.data?.amount.toLocaleString()}` },
              { label: "Quantity", value: EscrowData?.data?.quantity },
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
            
            {data.timeline.map((item, index) => (
              <div key={index} className="relative flex items-start gap-4 ">
                {/* Checkbox & Line */}
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    readOnly
                    checked={item.checked}
                    className="w-5 h-5 accent-green-500 disabled:!accent-green-500 text-white border border-blue-300 rounded-none"

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
                  {(item.action && !item.checked && (index === 0 || data?.timeline[index - 1].checked)) && (
                  <button onClick={item.actionFunc} className="mt-2 disabled:bg-gray-400 px-3 mr-2 py-1 border bg-blue-500 text-sm text-white rounded-full">
                    {item.action}
                  </button>
                  )}
                  { (item.action1 && !item.checked && (index === 0 || data?.timeline[index - 1].checked)) && (
                  <button onClick={item.action1Func}  className="mt-2 px-3 py-1 border border-blue-500 text-sm rounded-full">
                    {item.action1}
                  </button>
                  )}
                </div>

                {/* Time */}
                {/* <p className="text-xs text-[#5F738C] absolute right-0">{item.time}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowDetails;
