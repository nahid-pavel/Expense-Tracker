import EditItemForm from "@/app/components/EditItemForm";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default async function Page({ params }) {
  const getItemById = async () => {
    try {
      const res = await fetch(
        `${process.env.API_ENDPOINT_URL}/api/items/${params?.id}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    } catch (error) {
      console.log("Error loading topics");
    }
  };

  const { item } = await getItemById();

  return <EditItemForm item={item} />;
}
