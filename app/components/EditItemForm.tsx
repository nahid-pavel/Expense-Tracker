"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const EditItemForm = ({ item }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: item?.name,
      amount: item?.amount,
      quantity: item?.quantity,
      date: item?.date,
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${item?._id}`,
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.

          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },

          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Error Occured");
      }
    } catch (error) {
      console.log(error);
    }

    // Handle form submission logic here
  };

  return (
    <form className="grid grid-cols-2  gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("name")}
        className="border border-slate-500 px-8 py-2"
        placeholder="Name"
        required={true}
      />
      <input
        type="number"
        {...register("amount")}
        className="border border-slate-500 px-8 py-2"
        placeholder="Price"
        required={true}
      />
      <input
        type="number"
        {...register("quantity")}
        className="border border-slate-500 px-8 py-2"
        placeholder="Quantity"
      />

      <input
        type="date"
        {...register("date")}
        className="border border-slate-500 px-8 py-2"
        placeholder="Date"
      />
      <div />
      <div className="flex justify-end">
        <button type="submit" className="py-2 px-4 bg-slate-200 w-40 ">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditItemForm;
