const express = require('express')
const router = express.Router()
const Song = require('../models/song')

//getting all songs
router.get('/songs', async (req,res)=>{
   try{
    const  songs = await Song.find()
    res.json(songs)
   }
   catch(err){
    res.status(500).json( {message:err.message})
   }
})


///getting one
router.get('/songs/:id',(req,res)=>{
    const song = Song.findById(req.params.id);
    console.log('request params are =',req.params.id)
    res.json(song);
})

//creating one 
router.post('/', async (req,res)=>{
    const song = new Song({
            title:req.body.title,
            words:req.body.words,
            isSelected:req.body.isSelected,
            subWords: req.body.subWords,
            video:req.body.video


    })
    try{
        const newSong = await song.save()
        res.status(201).json(newSong)
    }
    catch(err){
            res.status(400).json({message:err.message})
    }
})
//update one
router.patch('/:id', async(req,res)=>{
    if(req.body.title != null){
        res.song.title = req.body.title
    }
    if(req.body.words != null){
        res.song.words = req.body.words
    }
    if(req.body.subWords != null){
        res.song.subWords = req.body.subWords
    }
    if(req.body.isSelected != null){
        res.song.isSelected = req.body.isSelected
    }
    if(req.body.video != null){
        res.song.video = req.body.video
    }
    try{
            const updatedSong = await res.song.save()
            res.json({message:"song is updated",},updatedSong)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})
///delete one 
router.delete('/:id',getSong, async (req,res)=>{
    try{
        await res.song.remove()
        res.json({message:"Deleted User"})
    }
    
    catch (err){
        res.status(500).json({message: "Deleted Subscriber"})
    }
})
async function getSong(req,res,next){
    let song
    try{
        song = await Song.findById(req.params.id)
        console.log('request parameter id = ',req.params.id)
        if(song == null){
            return res.status(404).json({message: 'cannot find'})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.song = song
    next()
}
module.exports = router;