module.exports=(req,res,next)=>{
    if(!req.session||!req.session.isAuthenticated)
         res.redirect('/login');
    else
    next();
}