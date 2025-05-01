import type {Request, Response } from "express";
import Theater from "../models/Theater";
import { theaterSchema } from "../utils/zodSchema";

export const getTheaters=async(req:Request,res: Response)=>{
    try{
        const theaters=await Theater.find()

        return res.json({
            data:theaters,
            message:"Success get data",
            status:"success"
        })
    }catch(error){
        return res.status(500).json({
            message:"Failed to get data",
            status:"failed",
            data:null
        })
    }
}
export const getTheatersdetail=async(req:Request,res: Response)=>{
    try{

        //get id dari parameter
        const {id}=req.params;
        
        const theater=await Theater.findById(id)

        return res.json({
            data:theater,
            message:"Success get data",
            status:"success"
        })
    }catch(error){
        return res.status(500).json({
            message:"Failed to get data",
            status:"failed",
            data:null
        })
    }
}

export const postTheater=async(req:Request,res: Response)=>{
    try{
        const body=theaterSchema.parse(req.body)

        const theater= new Theater({
              name:body.name,
                city:body.city
        })

        const newData= await theater.save()

      
        return res.json({
            data:newData,
            message:"Success create Data",
            status:"success"
        })
    }catch(error){
        return res.status(500).json({
            message:"Failed to create data",
            status:"failed",
            data:null
        })
    }
}

export const putTheater=async(req:Request,res: Response)=>{
    try{


        //get id
        const {id}=req.params;
        
        //get schema
        const body=theaterSchema.parse(req.body)


        //update data genre and id ganti nama
        await Theater.findByIdAndUpdate(id,{
            name:body.name,
            city:body.city
        })

        //cek hasil update
        const updateDate= await Theater.findById(id)
        

      
        return res.json({
            data:updateDate,
            message:"Success Update Data",
            status:"success"
        })
    }catch(error){
        return res.status(500).json({
            message:"Failed to Update data",
            status:"failed",
            data:null
        })
    }
}



export const deleteTheater=async(req:Request,res: Response)=>{
    try{


        //get id
        const {id}=req.params;
        
        //find id 
        const deleteData= await Theater.findById(id)
        

        //delete data genre and id ganti nama
        await Theater.findByIdAndDelete(id)

        return res.json({
            data:deleteData,
            message:"Success Delete Data",
            status:"success"
        })
    }catch(error){
        return res.status(500).json({
            message:"Failed to Delete data",
            status:"failed",
            data:null
        })
    }
}
