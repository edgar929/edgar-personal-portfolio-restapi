const mongoose = require('mongoose');
const Article = require('../models/Article')


exports.postArticle =async(req,res,next) =>{
                const article = new Article({ 
                    title:req.body.title,
                    summary:req.body.summary,
                    picture:'uploads/'+req.file.filename,
                    content:req.body.content,
                    owner:req.user._id
                })
                const item =  await article.save();

        		try{
        				res.send({
        					message: 'article saved successful',
        					data: item
        				})
                }catch(err){
                    console.log(err);
                    res.status(500).json({error:err});
                }
}

exports.getArticles=async(req,res,next)=>{
    const articles = await Article.find({}).then((article)=>{
        res.send(article)
    })
}
exports.getArticle=async(req,res,next)=>{
    const _id = req.params.id
    try {
        const article = await Article.findOne({_id,owner:req.user._id})
        
        if(!article){
            res.status(404).send('no article found')
        }
        res.send({
            message: 'operation successful',
            article:{
                article
            }
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteArticle = async(req,res)=>{
    try {
        const article =await Article.findOne({_id:req.params.id, owner:req.user._id})
       if(!article){
           res.send('blog not found')
       }
       res.send({
           message:"deleted successful",
        article:article})
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateArticle = async(req,res)=>{
  const article = new Article({
      _id:req.params.id,
      title: req.body.title,
      summary:req.body.summary,
      picture:req.file.filename,
      content:req.body.content
  });
  Article.updateOne({_id:req.params.id},article).then(()=>{
       res.status(201).send({
           message:'Article updated successfully'
       });
  }).catch((error)=>{
      res.status(400).json({
          error:error
      });
  })
}
