import type {Request, Response } from "express";
import Movie from "../models/Movie";
import { movieSchema } from "../utils/zodSchema";
// import { MovieSchema } from "../utils/zodSchema";
import path from "node:path";
import fs from "node:fs";
import Genre from "../models/Genre";
import Theater from "../models/Theater";
export const getMovies=async(req:Request,res: Response)=>{
    try{
        const movies=await Movie.find().populate({
            path: "genre",
            select: "name"
        }).populate({
            path: "theaters",
            select: "name"
        })

        return res.json({
            data:movies,
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


export const getMoviesdetail=async(req:Request,res: Response)=>{
    try{

        const {id}=req.params;
        const movie=await Movie.findById(id).populate({
            path: "genre",
            select: "name"
        }).populate({
            path: "theaters",
            select: "name"
        })

        return res.json({
            data:movie,
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

export const createMovie = async(req: Request, res: Response) => {
    try{
      
        if(!req.file){

            return res.status(400).json({
                message:"Thumbnail is required",
                status:"failed",
                data:null
            })
        }


        const parse=movieSchema.safeParse({
            title:req.body.title,
            genre:req.body.genre,
            theaters:req.body.theaters.split(','),
            available:req.body.available==='1' ? true : false,
            description:req.body.description,
            price:Number.parseInt(req.body.price),
            bonus:req.body?.bonus,
        });


        
        if(!parse.success){

            const errorMessages=parse.error.issues.map(err=>err.message);
            return res.status(400).json({
                message:"Invalid input",
                status:"failed",
                data:errorMessages
            })
            // return res.status(400).json({
            //     message:"Invalid input",
            //     status:"failed",
            //     data:parse.error.errors
            // })
        }


        const movie=new Movie({
            title:parse.data.title, 
            genre:parse.data.genre,
            theaters:parse.data.theaters,  
            available:parse.data.available,
            thumbnail:req.file?.filename,
            description:parse.data.description,
            price:parse.data.price,
            bonus:parse.data.bonus,
        });
        console.log(movie);
        await movie.save();
        return res.json({
            data:movie,
            message:"Success create data",
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


export const updateMovie = async(req: Request, res: Response) => {
     try{   
      

        const {id}= req.params;


    
        const parse=movieSchema.safeParse({
            title:req.body.title,
            genre:req.body.genre,
            theaters:req.body.theaters.split(','),
            available:req.body.available==='1' ? true : false,
            description:req.body.description,
            price:Number.parseInt(req.body.price),
            bonus:req.body?.bonus,
        });


        
        if(!parse.success){

            const errorMessages=parse.error.issues.map(err=>err.message);
            return res.status(400).json({
                message:"Invalid input",
                status:"failed",
                data:errorMessages
            })
         
        }

        const oldMovie=await Movie.findById(id);

        if(!oldMovie){
            return res.status(404).json({
                message:"Movie not found",
                status:"failed",
                data:null
            })
        }   


        if(req.file){
            const dirname=path.resolve();
            const filepath=path.join(
                dirname,
               "public/uploads/thumbnails",
               oldMovie.thumbnail??""
            )


            if(fs.existsSync(filepath)){
                fs.unlinkSync(filepath);
            }
        }

        await Genre.findByIdAndUpdate(oldMovie.genre,{
            $pull:{
                movies:oldMovie._id
            }
        
        })
        
        for(const theater of oldMovie.theaters) {
            await Theater.findByIdAndUpdate(theater,{
                $pull:{
                    movies:theater._id
                }
            })
        }   


        await Movie.findByIdAndUpdate(id,{
            title:parse.data.title, 
            genre:parse.data.genre,
            theaters:parse.data.theaters,  
            available:parse.data.available,
            thumbnail:req?.file ? req.file.filename:oldMovie.thumbnail,
            description:parse.data.description,
            price:parse.data.price,
            bonus:parse.data.bonus,
        })

        await Genre.findByIdAndUpdate(parse.data.genre,{
            $push:{
                movies:id
            }
        
        })
        
        for(const theater of parse.data.theaters) {
            await Theater.findByIdAndUpdate(theater,{
                $push:{
                    movies:id
                }
            })
        }   
        

        const updatedMovie=await Movie.findById(id);
        return res.json({
            data:updatedMovie,
            message:"Success Update data",
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


export const deleteMovie=async(req:Request,res: Response)=>{
    try{


        //get id
        const {id}=req.params;
        
        //find id 
        const movie= await Movie.findById(id)
        
        if(!movie){
            return res.status(404).json({
                message:"Movie not found",
                status:"failed",
                data:null
            })
        }   


        const dirname=path.resolve();
        const filepath=path.join(
            dirname,
            "public/uploads/thumbnails",
            movie.thumbnail??""
        )


        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath);
        }
        //delete data genre and id ganti nama
        await Movie.findByIdAndDelete(id)

        return res.json({
            data:movie,
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