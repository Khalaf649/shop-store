exports.get404=(req, res, next) => {
    res.status(404).render('404',{
     pageTitle:"error",
     path:req.url
    });
   };
   exports.get505=(req,res,next)=>{
    res.status(500).render('500',{
      pageTitle:'Error',
      path:'/500'
    })
   }