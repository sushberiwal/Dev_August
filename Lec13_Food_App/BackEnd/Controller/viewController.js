function getDemoPage(req, res) {
  // send demo page to client
  // res.render("demo.pug" , {title:"Demo Page" , content:"I am coming from object"});
  res.render("base.pug");
}

function getHomePage(req, res) {
  res.render("homepage.pug");
}

function getLoginPage(req, res) {
  res.render("login.pug");
}

module.exports.getDemoPage = getDemoPage;
module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
