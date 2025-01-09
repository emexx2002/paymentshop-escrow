import clsx from 'clsx'
import React from 'react'

const Label = ({ label }: { label: "PENDING" | "COMPLETED" | "CANCELED" | "DELIVERED" | "AWAITING_PAYMENT" }) => {
    return (
        <div className={clsx(
            'flex items-center text-xs whitespace-nowrap justify-center px-2 gap-2 min-w-[102px] h-[25px]',
            label === "CANCELED" && "text-[#C92B2B] rounded-[100px] bg-[#FCEFEF]",
            label === "PENDING" || label === "DELIVERED" || label === "AWAITING_PAYMENT" && "text-[#F79B24] rounded-[100px] bg-[#FFF9F2] ",
            label === "COMPLETED" && "text-[#29B32F] rounded-[100px] bg-[#F1FCF2] "
        )}>
            <span className={clsx(
                "h-[7px] w-[7px] rounded-full",
                label === "CANCELED"  && "bg-[#C92B2B]",
                label === "PENDING" || label === "DELIVERED" || label === "AWAITING_PAYMENT" && "bg-[#F79B24]",
                label === "COMPLETED" && "bg-[#29B32F]"
            )} />
            {label}
        </div>
    )
}

export default Label