const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/home");
  } else {
    next();
  }
};
module.exports = withAuth;
