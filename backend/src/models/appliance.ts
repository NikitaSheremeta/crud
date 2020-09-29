import { Schema, Document, model } from 'mongoose';

export interface IAppliance extends Document {
  title: string;
  description: string;
  category: string;
  vendorCode: string | number;
}

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  vendorCode: { type: String, required: true },
});

export default model<IAppliance>('Appliance', schema);
