import clsx from 'clsx'
import React, { useState } from 'react'

const TabBar = ({ onChange, tabs }: { onChange: (e: any) => void, tabs: string[] }) => {
    const [currentTab, setCurrentTab] = useState(tabs[0])

    const handleOnChange = (e: any) => {
        onChange(e)
        setCurrentTab(e)
    }
    return (
        <div className='h-[45px] bg-[#F3F5F6] w-auto p-[5px] flex justify-between items-center flex-nowrap gap-[10px] '>
            {
                tabs.map((tab, index) => <button key={index} onClick={() => handleOnChange(tab)} className={clsx(
                    'px-3 py-[10px] text-xs text-[#5F738C] rounded-lg',
                    currentTab === tab && 'bg-white text-[#1F2126] font-semibold'
                )}>{tab}</button>)
            }
        </div>
    )
}

export default TabBar