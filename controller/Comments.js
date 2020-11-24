const mongoose = require('mongoose')
const Comments = require('../models/Comments')

exports.addComment = async(req,res)=>{
    try {
        const data = (req.body)
        const comment = new Comments({...data, Article:req.params.id})

        await comment.save()
        res.status(200).send(comment)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getComments = async(req,res)=>{
    try {
        const comments = await Comments.findOne({Article:req.params.id})
        res.status(200).send(comments)
    } catch (error) {
        res.send({message:"not found"})
    }
}