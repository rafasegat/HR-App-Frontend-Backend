const Organization = require('../../models/Organization');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  /*
   * New organization
   */
  app.post('/api/account/new', (req, res, next) => {
    
    const { body } = req;
    const { name } = body;
    let { user } = body;
    
    if (!name) {
      return res.send({
        success: false,
        message: 'Error: Name cannot be blank.'
      });
    }
    if (!user) {
      return res.send({
        success: false,
        message: 'Error: User cannot be blank.'
      });
    }
   
    // // Steps:
    // // 1. Verify email doesn't exist
    // // 2. Save
    // User.find({
    //   email: email
    // }, (err, previousUsers) => {
    //   if (err) {
    //     return res.send({
    //       success: false,
    //       message: 'Error: Server error.'
    //     });
    //   } else if (previousUsers.length > 0) {
    //     return res.send({
    //       success: false,
    //       message: 'Error: Account already exist.'
    //     });
    //   }
    //   // Save the new user
    //   const newUser = new User();
    //   newUser.email = email;
    //   newUser.password = newUser.generateHash(password);
    //   newUser.save((err, user) => {
    //     if (err) {
    //       return res.send({
    //         success: false,
    //         message: 'Error: Server error'
    //       });
    //     }
    //     return res.send({
    //       success: true,
    //       message: 'Signed up!'
    //     });
    //   });
    // });
    
  });

  /*
   * Get all organizations by user
   */
  app.get('/api/organization/allByUser', (req, res, next) => {
    
    const { body } = req;
    const { user } = body;
    
    return res.send({
      success: false,
      message: 'Incsncsncs'
    });

  });

};