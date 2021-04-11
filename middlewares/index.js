module.exports ={
    redirectToDash : (req, res, next)=>{
        if (req.session.user) {
            res.redirect('/');
          } else {
            next();
          }
    },
    protectDash : (req, res, next) => {

        if (req.session.user) {
            next();
          } else {
            res.redirect('/login');
          }
    }

}