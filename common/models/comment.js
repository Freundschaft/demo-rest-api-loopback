'use strict';

module.exports = function (Comment) {
  Comment.observe('before save', function verifyForeignKeys(ctx, next) {
    if (ctx.instance) { // for single model update
      // check ctx.instance.fkField
      var s = ctx.instance;
      var articleId = s.__data.articleId;

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
    }
  });

  Comment.reply = function (msg, cb) {
    cb(null, 'Greetings... ' + msg);
  };

  Comment.remoteMethod('reply', {
    accepts: {arg: 'msg', type: 'comment'},
    returns: {arg: 'comment', type: 'comment'}
  });
};
