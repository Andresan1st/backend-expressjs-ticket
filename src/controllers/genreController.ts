import type {Request, Response } from "express";
import Genre from "../models/Genre";
import { genreSchema } from "../utils/zodSchema";

export const getGenres=async(req:Request,res: Response)=>{
    try{
        const genres=await Genre.find()

        return res.json({
            data:genres,
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


export const getGenresdetail=async(req:Request,res: Response)=>{
    try{

        //get id dari parameter
        const {id}=req.params;
        
        const genre=await Genre.findById(id)

        return res.json({
            data:genre,
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


export const postGenre=async(req:Request,res: Response)=>{
    try{
        const body=genreSchema.parse(req.body)

        const genre= new Genre({
              name:body.name
        })

        const newData= await genre.save()

      
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


export const putGenre=async(req:Request,res: Response)=>{
    try{


        //get id
        const {id}=req.params;
        
        //get schema
        const body=genreSchema.parse(req.body)


        //update data genre and id ganti nama
        await Genre.findByIdAndUpdate(id,{
            name:body.name 
        })

        //cek hasil update
        const updateDate= await Genre.findById(id)
        

      
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



export const deleteGenre=async(req:Request,res: Response)=>{
    try{


        //get id
        const {id}=req.params;
        
        //find id 
        const deleteData= await Genre.findById(id)
        

        //delete data genre and id ganti nama
        await Genre.findByIdAndDelete(id)

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

