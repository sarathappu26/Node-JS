const bodyParser = require('body-parser');
const express = require('express');
const { del } = require('express/lib/application');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const validation = [
  check('email').trim().isEmail().escape().normalizeEmail().withMessage('oru email adikk patti'),
  check('password').trim().isLength({ min: 6 }).escape().withMessage('oru password adikk patti'),
  check('age').trim().isLength({ max: 2 }).escape().withMessage('oru age adikk patti'),
];

module.exports = (params) => {
  const { dataservice } = params;
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  router.get('/:password', async (req, res, next) => {
    try {
      const errors = req.session.editform ? req.session.editform.errors : false;
      req.session.editform = {};
      console.log(req.params.password);
      const editformdata = await dataservice.getOne(req.params.password);
      return res.render('./editform', { pageTitle: 'editform', editformdata, errors });
    } catch (err) {
      next(err);
    }
  });
  router.put('/submit/:password', async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      req.session.editform = {
        errors: error.array(),
      };
      return res.redirect('/editform');
    }
    console.log(req.params.password);
    const { email, password, age } = req.body;
    const olddata = req.params.password;
    await dataservice.edit(olddata, email, password, age);
    return res.redirect('/');
  });
  router.get('/api/:password', async (req, res) => {
    const olddata = req.params.password;
    console.log(olddata);
    await dataservice.del(olddata);

    return res.redirect('/');
  });
  return router;
};
