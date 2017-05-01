module.exports = function (app) {
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var User = app.models.user;

  User.create([
    {email: 'qiong.wu@gfnork.de', password: 'password'},
    {email: 'notanadmin@gfnork.de', password: 'password'}
  ], function (err, users) {
    if (err) console.log(err);

    console.log('Created users:', users);
    //create the admin role
    Role.create({
      name: 'admin'
    }, function (err, role) {
      if (err) console.log(err);

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function (err, principal) {
        if (err) console.log(err);

        console.log('Created principal:', principal);
      });
    });
  });
};
