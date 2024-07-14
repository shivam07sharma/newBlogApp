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
async function publishBlog(data) {
  const { username, image, title, category, content, created } = await data;

  await connectToDb();
  const Model = await model();
  try {
    const newDoc = await new Model({
      username: username,
      image: image,
      title: title,
      category: category,
      content: content,
    });
    console.log(newDoc);
    await newDoc.save();
    return 200;

  } catch (e) {
    console.error("Error Occured : " + e);
    return 404;
  }
  finally {
    mongoose.disconnect();
  }
}
export async function GET(){
  await connectToDb();
  const Model = await model();
  try {
      const items = await Model.find({});
      if (!items) {
          return NextResponse.json({ status: 404, error: 'Not Found' });
      }
      return NextResponse.json({ status: 200, data: items });
  } catch (e) {
      console.error("Error fetching data: ", e);
      return NextResponse.json({ status: 503, error: 'Server Error' });
  } finally {
      // mongoose.disconnect();
  }

  }

export async function POST(req) {
  let data = await req.json();
  console.log(data);
  const status = await publishBlog(data);
  return NextResponse.json({ status: status });
}

