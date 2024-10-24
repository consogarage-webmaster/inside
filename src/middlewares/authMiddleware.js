const authMiddleware = {
    verifySessionUser : (req, res, next) => {
        const connectedUser = res.locals.user;
        if (!connectedUser) {
            return res.redirect('/login');
        }else{
            const permissions = res.locals.user.permissions;
            console.log(`permissions : ${permissions}`);
        }
        next();
    }
}


export default authMiddleware;