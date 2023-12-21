import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog w-[45%] ml-[210px] p-4 " style={{
            borderRadius: "1rem",
            boxShadow: "0px 10px 8px #999",
        }}>
            <p>{message}</p>
            <div className='flex mt-2'>
                <button className=' bg-white border-2 border-black-500 text-black px-11 py-1 text-center text-base font-medium rounded-md cursor-pointer '
                    onClick={onConfirm}>Confirm</button>
                <button className='flex bg-white border-2 border-black-500 text-black  px-11 py-1 text-center text-base font-medium rounded-md cursor-pointer ml-auto '
                    onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationDialog;