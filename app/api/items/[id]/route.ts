import ITEM from "@/app/models/items";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;

  const { name, amount, date, quantity } = await request.json();

  await connectMongoDB();

  console.log(id);

  await ITEM.findByIdAndUpdate(id, { name, amount, date, quantity });

  return NextResponse.json(
    {
      message: "Topic Updated",
    },
    { status: 200 }
  );
}

export async function GET(request: any, { params }: any) {
  const { id } = params;

  await connectMongoDB();

  const item = await ITEM.findOne({ _id: id });

  return NextResponse.json(
    {
      item,
    },
    { status: 200 }
  );
}
