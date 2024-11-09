import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const steps = [
    { label: 'Product Details' },
    { label: 'Vendor Details' },
    { label: 'Summary' },
];

const StepComponent = ({ currentStep, onStepClick }: {currentStep: number, onStepClick: (e:any) => void}) => {
   

    return (
        <div className="flex text-sm justify-between items-center my-6">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;

                return (
                    <React.Fragment key={index}>
                        <div className="flex items-center gap-2 text-center">
                            <div
                                onClick={() => onStepClick(stepNumber)}
                                className={`flex items-center justify-center w-[22px] h-[22px] rounded-full border cursor-pointer transition-all ${isCompleted ? 'bg-[#29B32F] text-white' : isActive ? 'border-[#29B32F] bg-white' : 'border-gray-300 bg-white'
                                    }`}
                            >
                                {isCompleted ? <FaCheck size={10} /> : <span className='text-xs'>{stepNumber}</span>}
                            </div>
                            <span className={` text-sm  ${isActive ? 'text-[#29B32F]' : 'text-gray-500'}`}>
                                {step.label}
                            </span>
                        </div>

                        {/* Horizontal line between steps */}
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-grow h-[3px] mx-2 transition-all ${isCompleted ? 'bg-[#29B32F]' : 'bg-gray-300'
                                    }`}
                            ></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepComponent;
