const nodemon = require('nodemon');
const path = require('path');

nodemon({
  restartable: 'rs',
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server/server'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['server/*', 'client/*'] : false,
  ext: 'js'
}).on('restart', function() {
   console.log('Server restarting...');
 });



// .on('restart', function() {
//   console.log('Server restarted!');
// })
// .once('exit', function () {
//   console.log('Shutting down server');
//   process.exit();
// })