const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // Let's loop each on /api file and require it
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};
  