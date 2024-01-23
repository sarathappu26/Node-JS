const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
module.exports = (params) => {
  const { dataservice } = params;

  router.get('/', (req, res) => {
    const errors = req.session.form ? req.session.form.error : true;

    const successMessage = req.session.form ? req.session.form.message : true;
    req.session.form = {};

    return res.render('./form', { pageTitle: 'formdetails', errors, successMessage });
  });
  router.post(
    '/',
    [
      check('email')
        .trim()
        .isEmail()
        .escape()
        .normalizeEmail()
        .withMessage('oru email adikk patti'),
      check('password')
        .trim()
        .isLength({ min: 6 })
        .escape()
        .withMessage('oru password adikk patti'),
      check('age').trim().isLength({ max: 2 }).escape().withMessage('oru age adikk patti'),
    ],
    async (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        req.session.form = {
          error: error.array(),
        };
        return res.redirect('/form');
      }
      const { email, password, age } = req.body;
      await dataservice.addEntry(email, password, age);
      req.session.form = {
        message: 'successfully added',
      };
      return res.redirect('/');
    }
  );

  return router;
};
