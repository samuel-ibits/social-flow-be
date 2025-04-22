const SocialAccount = require('../models/SocialAccount');

exports.connectAccount = async (req, res) => {
  const account = await SocialAccount.create({
    ...req.body,
    projectId: req.body.projectId
  });
  res.json(account);
};

exports.getAccounts = async (req, res) => {
  const accounts = await SocialAccount.find({ projectId: req.query.projectId });
  res.json(accounts);
};
