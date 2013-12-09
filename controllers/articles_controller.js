var articleModel   = require('../models/article');

module.exports = {
  index: function(req, res){
    articleModel.find({}, 'id title', function(error, articles){
      if(error){ return res.send(500, error); }

      return res.send(200, articles);
    });
  },
  new: function(req, res){
    articleModel.findOne({title: req.body.article.title}, function(error, article){
      if(error){ return res.send(500, error); }

      if(article){ return res.send(409, {message: 'An article that goes by this title already exists.'}); }

      var new_article = new articleModel(req.body.article);
      new_article.save(function(error, article){
        if(error){ return res.send(500, error); }

        return res.send(200, {message: "Article saved correctly"})
      });
    });
  }
};
