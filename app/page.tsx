import Image from "next/image";
import Navbar from "./components/Navbar";
import ItemsList from "./components/Items/ItemsList";

const getItems = async () => {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT_URL}/api/items`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics");
  }
};

export default async function Home() {
  const { items } = await getItems();
  return (
    <>
      <ItemsList items={items} />
    </>
  );
}
