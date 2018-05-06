const fs = require('fs');
const path = require('path');
const config = require('../../config/config');

module.exports = (app, express) => {

  // Let's loop each on /api file and require it
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });


  const apiRoutes = express.Router();

  apiRoutes.use(function(req, res, next) {
    
    var token = req.body.token || 
                req.query.token || 
                req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.super_secret, function(err, decoded) {      
        if (err) {
          console.log(err);
          return res.json({ 
              success: false, 
              message: 'Failed to authenticate token.' 
          });    
        } else {
          console.log(decoded);
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      console.log("no token");
      return res.send({ 
          success: false, 
          message: 'No token provided.' 
      });
    }
  });
  
  app.use('/api', apiRoutes);

};

 