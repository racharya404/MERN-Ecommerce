import React from 'react';
import styles from '../../styles/styles';
import { CheckOutSteps } from '../../static/data';

const CheckoutSteps = ({ active }) => {
  return (
    <div className='w-full flex justify-center'>
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        {CheckOutSteps.map((step, index) => (
          <div key={index} className={`${styles.commonFlex}`}>
            <div className={`${styles.cart_button} ${active > index + 1 ? '' : '!bg-[#FDE1E6]'} `}>
              <span className={`${styles.cart_button_text} ${active > index + 1 ? '' : '!text-[#f63b60]'}`}>
                {step.text}
              </span>
            </div>
            {index < CheckOutSteps.length - 1 && (
              <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > index + 1 ? '!bg-[#f63b60]' : '!bg-[#FDE1E6]'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
