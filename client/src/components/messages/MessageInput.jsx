import React from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const {
    register,
    reset, // Corrected to reset instead of resetField
    handleSubmit,
  } = useForm();

  const {loading, sendMessage} = useSendMessage()

  const onSubmit = async (data) => {
    try {
      await sendMessage(data.message)
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Send a message"
          {...register("message", { required: "Empty messages not allowed" })}
          className="px-4 py-2 w-[450px] border border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition-colors duration-300 hover:bg-gray-900"
        />

        <button
          type="submit"
          className="btn btn-ghost btn-circle"
        >
          {
            loading 
             ? <span className="loading loading-spinner loading-md"></span>
             : <IoIosSend />
          }
        </button>
      </form>
    </>
  );
};

export default MessageInput;
