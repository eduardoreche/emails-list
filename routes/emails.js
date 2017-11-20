var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

router.get('/', function(req, res, next) {
  const file = './emails-20171119.json';
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  res.render('email', { emails: getEmails(obj) });
});

const getEmails = json => {
  const emails = [];
  let idx = 1;
  _.map(json, item => {
    if (item.email || item.providerData[0].email)
      emails.push({
        index: idx++,
        displayName: item.displayName,
        email: item.email || item.providerData[0].email
      });
  });

  return emails;
};

module.exports = router;
