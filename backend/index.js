import express from "express"
import mongoose from "mongoose"
import Movie from "././models/movie.js"
import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from "dotenv"


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors({
    origin:true
}))
dotenv.config()

app.post('/movies',(req,res)=>{
    const movie = new Movie({
        title:req.body.title,
        gener:req.body.gener,
        rating:req.body.rating,
        language:req.body.language
    })
   movie.save()
    .then((movie)=>{
        res.send(movie)
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/getmovies',(req,res)=>{
    Movie.find()
    .then((movie)=>{
        res.send(movie)
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

app.delete('/movies/:id',(req,res)=>{
    const id  = req.params.id
    Movie.findByIdAndDelete(id)
    .then(()=>{
    console.log("deleted")
})
.catch((err)=>{
    console.log(err)
})
})
app.put("/movies/:id",(req,res)=>{
    const id = req.params.id
    Movie.findByIdAndUpdate(id,{
        title:req.body.title,
        gener:req.body.gener,
        rating:req.body.rating,
        language:req.body.language
       
        }) 
        .then(()=>{
            res.send("updated")
    })
    .catch((err)=>{
        res.send(err)
    })
})

 mongoose.connect(process.env.ATLAS_MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

app.listen(4000,()=>{
    console.log('server runnging')
})