import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";
import Genre from "./Genre";
import Theater from "./Theater";
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Genre",    
     
    },
    theaters:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theater",    
     
    },
    description:{
        type:String,
        required:true
    },
    thunbnail:{
        type:String,
        required:true
    },
    price:Number,
    available:Boolean,
    bonus:String,
},{
    virtuals:{
        thumbnailUrl:{
            get(){
                return `${getAssetUrl()}${this.thunbnail}`
            }
        }
    },
    toJSON:{
        virtuals:true,
    },
})

movieSchema.post("save",async function(doc) {
   if(doc){
        await Genre.findByIdAndUpdate(doc.genre,{
            $push:{
                movies:doc._id
            }

        })


        if (Array.isArray(doc.theaters)) {
            for (const theater of doc.theaters) {
                await Theater.findByIdAndUpdate(theater,{
                    $push:{
                        movies:doc._id
                    }
                })
            }
        }
   }
})

movieSchema.post("deleteOne",async function(doc) {
    if(doc){
        await Genre.findByIdAndUpdate(doc.genre,{
            $pull:{
                movies:doc._id
            }

        })

        for(const theater of doc.theaters) {
            await Theater.findByIdAndUpdate(theater,{
                $pull:{
                    movies:doc._id
                }
            })
        }   
    }
})
export default mongoose.model('Movie',movieSchema,"movies");