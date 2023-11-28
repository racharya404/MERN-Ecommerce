import React from 'react';
import styles from '../../styles/styles';
import { CheckOutSteps } from '../../static/data';

const CheckoutSteps = ({ active }) => {
  return (
    <div className='relative w-full flex justify-center  bg-white rounded-md p-2 shadow-md'>
      <div className="flex items-center flex-wrap">
        {CheckOutSteps.map((step, index) => (
          <div key={index} className={`${styles.commonFlex}`}>
            <div className={`relative px-[30px] h-[38px] rounded-[20px] bg-${active > index + 1 ? 'green' : 'red'} flex items-center justify-center `}>
              {active === index + 1 && (
                <div className="pl-10 pr-5 absolute top-[5px] w-0 h-0 border-[5px] border-solid border-green-500 border-t-0 border-l-3 border-r-3 transform rotate-180"></div>
              )}
              <span className={`text-[#000] text-[16px] font-[600] ${active ? 'text-black' : 'text-[#f63b60]'}`}>
                {step.text}
              </span>
            </div>
            {index < CheckOutSteps.length - 1 && (
              <div className={`w-[30px] 800px:w-[250px] h-[4px] ${active > index + 1 ? 'bg-green-500' : 'bg-[#FDE1E6]'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
