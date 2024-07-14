import { NextResponse } from "next/server";
import mongoose from 'mongoose';

async function main(data) {
     const {Username,Password,Profile}=await data;

     try {
      if(!mongoose.connection.readyState){
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })};
        console.log("Connected to database");
        const schema=mongoose.Schema({
            username:{type:String,unique:true,required:true,min:4,max:23},
            password:String,
            email:String,
            isVerified:{type:Boolean,default:false},
            isAdmin:{type:Boolean,default:false},
            profilePhoto:{type:String},
            created:{type:Date,default:Date.now()}
        })
    const Model =mongoose.models.UserAuth || mongoose.model('UserAuth', schema);
    const newDoc = new Model({ 
        username:Username,
        password:Password,
        profilePhoto:Profile
        });
    await newDoc.save();
    const document = await Model.findOne({username:Username,password:Password});
    console.log(document);
    return 200;
 
  } catch (e) {
    console.error("Error Occured fck"+e);
    return 400;
  } 
  finally{
    mongoose.disconnect();
}
}
export async function POST(req){
    let data=await req.json();
    console.log(data);
    const status=await main(data);
    return NextResponse.json({status:status});
}