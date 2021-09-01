const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer'); //import library to handle file from form
var myDate = new Date().toDateString();
require('dotenv').config({ path: './exclude.env' });
const uuid = require('uuid'); //create unique name for each photo uploaded
//const axios = require("axios").create({baseUrl: "https://api.scripture.api.bible/v1/bibles/685d1470fe4d5c3b-01/passages/1CO.2?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true&use-org-id=false"});
const axios = require("axios").default;
let config = {
    headers: {
        'api-key': process.env.bible_api_key,
         timeout: 1000,
    }
}

//set the strategy for storage or parameters
const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        //console.log(file);
        cb(null, uuid.v4() + ' & ' +  file.originalname); //file.filename & file.originalname
    }
});
//only take certain type of files
const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
    } else {
    cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: { fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
}); //initiialize multer



const User = mongoose.model('User');
const profileImages = mongoose.model('profileImages');

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
                return res.status(200).json({ status: true, user : _.pick(user,['_id','fullName', 'email', 'role']) });
        }
    );
}

module.exports.userProfileImages = (req, res, next) => {
    profileImages.find({ profile_id: req._id } , '-__v -updatedAt',
        (err, images) => {
            if (!images)
                return res.status(404).json({ status: false, message: 'User profile images not found.'});
            else 
                console.log(images);
                return res.status(200).json({ status: true, images });
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
        _id: req.body._id,
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
    console.log(user._id);

    if(user._id == null) {
        user._id = new mongoose.mongo.ObjectID();
    }
    
    console.log(user._id);
   
    
    User.findByIdAndUpdate(user._id, { $set: user }, {upsert: true, new: true}, (err, doc) => {
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

//must put it in an array in order to include the multer in the exports. Hence the [] at beginning and end;

//must put it in an array in order to include the multer in the exports. Hence the [] at beginning and end;

module.exports.uploadImage = [upload.single('myFile'),  (req,res,next) => {
   console.log(req.file);
    var profileimages = new profileImages();
    profileimages._id = new mongoose.Types.ObjectId();
    profileimages.profile_id = req.body.profile_id;
    profileimages.description = req.body.description;
    profileimages.comment = req.body.comment;
    profileimages.album = req.body.album;
    profileimages.image = "http://localhost:3000/api/" + req.file.path;
    profileimages.save((err, doc) => {
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
}];



module.exports.uploads = (req, res, next) => {
    profileImages.find()
      .select("description comment album _id image")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              description: doc.description,
              comment: doc.comment,
              productImage: doc.image,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/api/" + doc.image
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

//api for getting bible third part api using axios. 
//bible api routes 
module.exports.bibles = async (req, res, next) => {
    
    try {
      
        const response = await axios.get(
          "https://api.scripture.api.bible/v1/bibles?language=eng&ids=65eec8e0b60e656b-01%2Cde4e12af7f28f599-01%2C06125adad2d5898a-01",
          config // this config parameter is set at the top. //has api key
        );
        console.log(response.data);
        //get only the fields i need using lodash map and pick functions.
        var mapped = _.map(response.data.data, (o) => {return _.pick(o,"id","nameLocal","abbreviationLocal"); } );
        res.send(mapped);
      } catch (error) {
        console.error(error);
      }
     

};

module.exports.bible = async (req, res, next) => {
    
    try {
      
        const response = await axios.get(
          "https://api.scripture.api.bible/v1/bibles/685d1470fe4d5c3b-01/passages/1CO.2?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true&use-org-id=false",
          config // this config parameter is set at the top. //has api key
        );
        console.log(response);
        res.send(response.data);
      } catch (error) {
        console.error(error);
      }
     

};

module.exports.books = async (req, res, next) => {
    
    try {
      
        const response = await axios.get(
          "https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/books?include-chapters=false",
          config // this config parameter is set at the top. //has api key
        );
        console.log(response);
        res.send(response.data.data);
      } catch (error) {
        console.error(error);
      }
     

};

module.exports.chapters = async (req, res, next) => {
    
    try {
      
        const response = await axios.get(
          "https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/books/1TI/chapters",
          config // this config parameter is set at the top. //has api key
        );
        console.log(response);
        res.send(response.data.data);
      } catch (error) {
        console.error(error);
      }
     

};