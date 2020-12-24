

function getDemoPage(req , res){
    // send demo page to client
    res.render("demo.pug");
}


module.exports.getDemoPage = getDemoPage;

