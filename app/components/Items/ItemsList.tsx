"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const ItemsList = ({ items }) => {
  const grandTotal = items?.reduce((curr, next) => {
    return curr + next?.amount;
  }, 0);

  const router = useRouter();

  const groupedItems = items.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {}) as any;

  const removeHandler = async (id) => {
    const confirmed = confirm("Are you sure you want to remove ?");
    if (confirmed) {
      await fetch(`h${process.env.API_ENDPOINT_URL}/api/items?id=${id}`, {
        method: "DELETE",
      });
    }
    router.refresh();
  };

  return (
    <>
      <h4>
        Total Amount:{" "}
        <span className="text-green-600 font-bold">{grandTotal}</span>
      </h4>
      {/* <button className="bg-green-300 py-2 px-3" onClick={()=>{}}>Pin to Home</button> */}

      {Object.entries(groupedItems as Record<string, any[]>)?.map(
        ([date, itemList]) => (
          <div key={date}>
            <h3>Date: {date}</h3>

            <table className="w-full border border-black my-3">
              <thead>
                <tr>
                  <th className="border border-black bg-slate-400">Date</th>
                  <th className="border border-black bg-slate-400">
                    Item Name
                  </th>
                  <th className="border border-black text-center bg-slate-400">
                    Price
                  </th>
                  <th className="border border-black bg-slate-400">Quantity</th>
                  <th className="border border-black bg-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map(({ name, amount, quantity, _id }) => (
                  <tr key={_id}>
                    <td className="border border-black">{date}</td>
                    <td className="border border-black">{name}</td>
                    <td className="border border-black text-center">
                      {amount}
                    </td>
                    <td className="border border-black text-center">
                      {quantity}
                    </td>
                    <td className="border border-black  ">
                      <span className="flex gap-6 justify-center">
                        <MdEdit
                          onClick={() => {
                            router.push(`/editItem/${_id}`);
                          }}
                        />

                        <CiCircleRemove
                          onClick={() => {
                            removeHandler(_id);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-200">
                <td />
                <td className="text-center">
                  <dt>Total</dt>
                </td>

                <td className="text-center">
                  <dt>
                    {itemList.reduce((sum, item) => sum + item.amount, 0)}
                  </dt>
                </td>
                <td />
                <td />
              </tfoot>
            </table>
          </div>
        )
      )}
    </>
  );
};

export default ItemsList;
