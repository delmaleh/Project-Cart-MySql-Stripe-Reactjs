const jwt = require('jsonwebtoken');
const {check_userId} = require('../controllers/user')

//function that you must add in router which need auth
module.exports = async (req, res, next) => {
  try {
    console.log( 'hearder',req.headers)
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    console.log('decodedToken',decodedToken)
    const userId = decodedToken.userId;
    const checkUser = await check_userId(userId);
   // console.log(checkUser);
    if (!checkUser) {
        console.log(checkUser);

        throw 'Invalid user ID';
    } else {
        
      req.user_id = userId;
      console.log(req.user_id);
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};