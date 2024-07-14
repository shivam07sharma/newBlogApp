import { NextResponse } from "next/server";
import mongoose from 'mongoose';

async function main(data) {
     const {username,password}=await data;
     try {
      if(!mongoose.connection.readyState){
      await mongoose.connect(process.env.MONGODB_URI,)
      console.log("Connected to database");
    };
        const schema=new mongoose.Schema({
            username:{type:String,unique:true,required:true,min:3,max:23},
            password:String,
            isVerified:{type:Boolean,default:false},
            created:{type:Date,default:Date.now()}
        })
        console.log("username:",username,"\nPass:",password);
    const Model = mongoose.models.UserAuth || mongoose.model('UserAuth', schema);
    const document = await Model.findOne({username:username,password:password});
    console.log(document);
    if(document){
      return {status:200,data:document};
    }
    else{
      return {status:404,data:"User not Found"};
    }
  }
  catch(e){
    return {status:500,data:e};
  }
  finally{
    mongoose.disconnect();
  }
 
}
export async function POST(req){
    let data=await req.json();
    console.log(data);
    const status=await main(data);
    return NextResponse.json(status);
}