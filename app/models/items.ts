import mongoose, { Schema } from "mongoose";

const itemsSchema = new Schema(
  {
    name: String,
    date: String,
    quantity: Number,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

const ITEM = mongoose.models.Item || mongoose.model("Item", itemsSchema);

export default ITEM;
