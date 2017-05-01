'use strict';

module.exports = function (Comment) {
  Comment.observe('before save', function verifyForeignKeys(ctx, next) {
    if (ctx.instance) { // for single model update
      // check ctx.instance.fkField
      var s = ctx.instance;
      var articleId = s.__data.articleId;

      if(articleId) {

        //Get the Application object which the model attached to, and we do what ever we want
        Comment.getApp(function (err, app) {
          //App object returned in the callback
          //PersistedModel.exists(id, callback ((err, exists)))
          app.models.article.exists(articleId, function (err, exists) {
            if (err) throw err;
            if (!exists) {
              return next(new Error('Bad foreign key...'));
            } else {
              return next();
            }
          });
        });
      } else {
        next();
      }
    }
  });
};
