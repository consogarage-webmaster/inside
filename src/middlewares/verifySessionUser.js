const verifySessionUser = (req, res, next) => {
    const connectedUser = res.locals.user;
    if (!connectedUser) {
        return res.redirect('/login'); // Use return to stop further execution
    }
    next();
};
export default verifySessionUser;