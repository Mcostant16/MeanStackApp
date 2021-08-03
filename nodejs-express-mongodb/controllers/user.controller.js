const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;


const User = mongoose.model('User');

module.exports.register = (req,res,next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = "User";
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
        {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }   
           
    });
}

module.exports.authenticate = (req, res, next) => {
    //call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        //error from passport middleware
        if (err) return res.status(400).json(err);
        //registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        //unknown user or wrong password
        else return res.status(404).json(info);
    }) (req, res);

}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id } ,
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.'});
            else 
                return res.status(200).json({ status: true, user : _.pick(user,['fullName', 'email', 'role']) });
        }
    );
}
//return all users and fields except password
module.exports.users= (req, res ) => {
    User.find({},'-password', (err, docs)  => {
        if (!err) { res.send(docs); }
        else { res.status(404).json({ status: false, message: 'User records not found.'}); }
    });
}

module.exports.updateUser = (req,res,next) => {
    
    var user= {
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        mobile: req.body.mobile,
        city: req.body.city,
        state: req.body.state,
        gender: req.body.gender,
        department: req.body.department,
        isActive: req.body.isActive,
        dob: req.body.dob
    };
    
    User.findByIdAndUpdate(req.body._id, { $set: user }, {new: true}, (err, doc) => {
        if (!err) {res.send(doc); console.log("update took place " + req.body._id + req.body.fullName + req.body.email + req.body.role + doc ); }
        else { console.log('Error in User Update : ' + JSON.stringify(err. undefined, 2)); }
    });

}

//delete specified user
module.exports.deleteUser = (req,res,next) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id :  ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {res.send(doc);  }
        else { console.log('Error in Hero Delete: ' + JSON.stringify(err. undefined, 2)); }
    });
            
}
    

    
