const express = require('express');
const router = express.Router();

const formRoutes = require('./form');
const editformRoutes = require('./editform');

module.exports = (params) => {
  const { dataservice } = params;

  router.get('/', async (req, res) => {
    const successMessage = req.session.form ? req.session.form.message : true;
    req.session.form = {};
    const tabledata = await dataservice.getList();
    res.render('index', { pageTitle: 'CRUD', template: 'index', tabledata, successMessage });
  });
  router.use('/form', formRoutes(params));
  router.use('/editform', editformRoutes(params));

  return router;
};
