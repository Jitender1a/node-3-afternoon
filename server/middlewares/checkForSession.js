module.exports = function( req, res, next ) {
    const { session } = req; 
  
    if ( !session.user ) { // check to see if a user does not exist 
      session.user = { username: '', cart: [], total: 0 }; // if they do not exist add user
    } 
    
    next();
  };