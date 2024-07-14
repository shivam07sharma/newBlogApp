import { NextResponse } from "next/server";
import mongoose from 'mongoose';

//Connext to Database...
const connectToDb = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("Connected to database");
    }
  }
  catch (e) {
    console.log("Connection Error : ", e);
  }
};

//Define Schema=>
const model = async () => {

  try {
    const schema = new mongoose.Schema({
      username: { type: String, required: true },
      image: { type: String },
      title: String,
      category: String,
      content: String,
      isVerified: { type: Boolean, default: false },
      created: { type: Date, default: Date.now() },

    })
    return mongoose.models.Blogs || mongoose.model('Blogs', schema);
  }
  catch (e) {
    console.log("Model not Created : ", e);
  }
}
 
export async function GET(req,{params}){
  await connectToDb();
  const Model = await model();
  const slug= params.slug;
  try {
      const items = await Model.find({username:slug});
      if (!items) {
          return NextResponse.json({ status: 404, error: 'Not Found' });
      }
      return NextResponse.json({ status: 200, data:items});
  } catch (e) {
      console.error("Error fetching data: ", e);
      return NextResponse.json({ status: 500, error: 'Server Error' });
  } finally {
      // mongoose.disconnect();
  }

  }

