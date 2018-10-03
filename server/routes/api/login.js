const User = require('../../models/User');
const Tools = require('../../common/tools');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const bcrypt = require('bcrypt');

module.exports = (app) => {

  /*
  * Sign up
  */
  app.post('/account/signup', (req, res, next) => {

    const { body } = req;
    const { data } = body;

    if (!data.email)
      return res.send({ success: false, message: 'Error: Email cannot be blank.' });

    if (!Tools.validateEmail(data.email))
      return res.send({ success: false, message: 'Invalid email.' });

    if (!data.password)
      return res.send({ success: false, message: 'Error: Password cannot be blank.' });

    data.email = data.email.toLowerCase();
    data.email = data.email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.query()
      .where('email', data.email)
      .then(users => {
        if (users.length > 0)
          return res.send({ success: false, message: 'This user already exists.' });

        try {
          data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
        } catch (err) {
          return res.status(500).send({ success: false, message: "Ta tudo cagado." });
        }

        // Save the new user
        User.query().insert(data)
          .then(json => {
            if (!json.id)
              return res.send({ success: false, message: "Error: Not added." });

            return res.send({ success: true, message: "Added!" });

          })
          .catch(err => {
            return res.status(500).send({ success: false, message: err });
          });

      })
      .catch(err => {
        return res.status(500).send({ success: false, message: err });
      });

  });

};