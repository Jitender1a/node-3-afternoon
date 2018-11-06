const users = require('../models/users');
let id = 1;

module.exports = {
  login: ( req, res, next ) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find( user => user.username === username && user.password === password );

    if ( user ) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send('Unauthorized.');
    }
  },

  register: ( req, res, next ) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;

    res.status(200).send( session.user );
  },

  signout: ( req, res, next ) => {
    const { session } = req;
    session.destroy();
    res.status(200).send( req.session );
  },

  getUser: ( req, res, next ) => {
    const { session } = req;
    res.status(200).send( session.user );
  }
};



/*
const  users=require ('../models/users');
let id=1;  // We'll also need to create a global id variable. We'll use this variable to assign ids to newly registered users and then increment it by one so no users have the same id.



// Now, let's export an object with a login, register, signout, and getUser method. Each method should capture req, res, and next as parameters.
module.export={
    login:(req,res,next)=>{ 
        const {session}=req;
        const {username,password}=req.body;
        const user=users.find(user=>user.username=username && user.password===password);

        if(user){
            session.user.username=user.username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Unathorized')
        }

    },

    register:(req,res,next)=>{
        const {session}=req;
        const {username,password}=req.body;

        user.push({id,username,password});
        id++;

        session.user.username=username;

        res.status(200).send(session.user)
    },

    signout:(req,res,next)=>{ // is responsible for destroying the session and returning the session ( which should be undefined at that point ).
        const{session}=req;
        session.destroy();
        res.status(200).send(session);
    },
    getUser:(req,res,next)=>{ //is responsible for reading the user object off of session and return it with a status of 200.
        const {session}=req;
        res.status(200).send(session.user);
    }
}
*/
