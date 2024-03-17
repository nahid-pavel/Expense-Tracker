import connectMongoDB from "@/libs/mongodb";
import ITEM from "../../models/items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, date, amount, quantity } = await request.json();
  await connectMongoDB();
  await ITEM.create({ name, date, amount, quantity });
  return NextResponse.json(
    {
      message: "Item Created",
    },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const items = await ITEM.find();
  return NextResponse.json({
    items,
  });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ITEM.findByIdAndDelete(id);

  return NextResponse.json(
    {
      message: "Item Deleted",
    },
    { status: 200 }
  );
}
