const express = require('express');
const xml2js = require('xml2js');
const bodyParser = require('body-parser');

app.use(bodyParser.text({ type: 'application/xml' }));

exports.fetchNavItems = async (req) => {
  const xml = req.body;

  xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
    if (err) {
      return ({ error: 'Invalid XML' });
    }
    return result
  });
};