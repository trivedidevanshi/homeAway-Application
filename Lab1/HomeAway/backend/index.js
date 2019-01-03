const port = process.env.PORT || 3001;
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000,
    
}));
 
const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log("pic res file: "+file.originalname);
        const newFilename=file.originalname;
      //const newFilename = `test${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
  
  const upload = multer({ storage });
  const uploadmultiple = multer({ storage : storage}).array('selectedFile',5);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.post('/multiple', (req, res) => {
      console.log("Inside multiple pic");
    //console.log("Req : ",req);
    uploadmultiple(req,res,function(err){

      //  console.log(JSON.stringify(req.files[0].originalname));

     /*   var uploadFileName=JSON.stringify(req.files[0].originalname);
        console.log("upim: "+uploadFileName);*/
        res.end(JSON.stringify(req.files[0].originalname));
        
    })
   
   //res.end("end");
});

app.post('/multiple/download/:file(*)',(req, res) => {
  console.log("Inside download file");
  var file = req.params.file;
  var fileLocation = path.join(__dirname + '/uploads',file);
  var img = fs.readFileSync(fileLocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(base64img);
});

 
  app.post('/onPicSubmit', upload.single('selectedFile'), (req, res) => {
      console.log("Inside getPicSubmit post request");
    //console.log("res : ",res.file);
    //console.log("Res : ",req.file.originalname);
    var uploadFileName=req.file.originalname;
    res.send();
    var sql = "UPDATE profileinfo SET profileImage='" + 
    uploadFileName +"' WHERE email='"+req.session.user+"';";
    console.log("SQL : "+sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
        
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                   // console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){ 
                        console.log("Success");
                           /* res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })*/
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });

});

app.post('/download/:file(*)',(req, res) => {
  console.log("Inside download file");
  var file = req.params.file;
  
  var fileLocation = path.join(__dirname + '/uploads',file);
  var img = fs.readFileSync(fileLocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(base64img);
});

//Route to handle getPicName Request Call
app.get('/getPicName',function(req,res){
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    console.log("Inside getPicName GET Request");
        
        var sql = "SELECT profileImage FROM profileInfo WHERE email = '"+req.session.user+"';"; 
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                        console.log("get req:response:\n"+ JSON.stringify(result[0].profileImage));
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end(JSON.stringify(result[0].profileImage));
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});



//Route to handle Post Request Call
app.post('/signUp',function(req,res){
    
    console.log("Inside traveler Sign Up Post Request");
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var oORt = "t";
        var sql = "INSERT INTO profileInfo(firstName, lastName, email, password, oORt) VALUES(" + 
        mysql.escape(firstName) +","+mysql.escape(lastName) +","+mysql.escape(email) +","+ mysql.escape(password) +","+ mysql.escape(oORt) +")";
        console.log("SQL Query: "+ sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                      //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                            console.log("Success");
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
});


//Route to handle Post Request Call
app.post('/travelerLogin',function(req,res){
    
    console.log("Inside Login Post Request");
        var email = req.body.email;
        var password = req.body.password;
        var sql = "SELECT *  FROM profileInfo WHERE email = " + 
                mysql.escape(email) + "and password = " + mysql.escape(password);
                console.log(sql);
                console.log("SQL Query: "+sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0 && result[0].oORt=='t'){
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                       // console.log("result = "+JSON.stringify(result));
                       console.log("Success");
                        req.session.user = result[0].email;
                        console.log(req.session.user);
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                      
                    }

                }
            });
        }
    });
});


//Route to handle Post Request Call
app.post('/userProfile',function(req,res){
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    console.log("Inside userProfile Post Request");
        var firstName = req.body.profileFirstName;
        var lastName = req.body.profileLastName;
        var aboutMe = req.body.profileAboutMe;
        var city = req.body.profileCity;
        var country = req.body.profileCountry;
        var company = req.body.profileCompany;
        var school = req.body.profileSchool;
        var hometown = req.body.profileHomeTown;
        var languages = req.body.profileLanguages;
        var gender = req.body.profileGender;
        var phoneNumber = req.body.profilePhoneNumber;
        console.log("session: "+req.session.user);
        
        var sql = "UPDATE profileInfo SET "+
        "firstName = "+mysql.escape(firstName)+","+
        "lastName = "+mysql.escape(lastName)+","+
        "aboutMe = "+mysql.escape(aboutMe)+","+
        "city = "+mysql.escape(city)+","+
        "country = "+mysql.escape(country)+","+
        "company = "+mysql.escape(company)+","+
        "school = "+mysql.escape(school)+","+
        "hometown = "+mysql.escape(hometown)+","+
        "languages = "+mysql.escape(languages)+","+
        "gender = "+mysql.escape(gender)+","+
        "phoneNumber = "+mysql.escape(phoneNumber)+
        " WHERE email= '"+ req.session.user+" ' "+";"; 
        console.log("sql: \n"+sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                       // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                       // req.session.user = result;
                       console.log("Success");
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});

//Route to handle Post Request Call
app.get('/userProfile',function(req,res){
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    console.log("Inside userProfile GET Request");
        
        var sql = "SELECT * FROM profileInfo WHERE email = '"+req.session.user+"';"; 
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                       // console.log("get req:response:\n"+ JSON.stringify(result));
                       console.log("Success");
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end(JSON.stringify(result));
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});

///////////////////////////////
///////////////owner///////////
///////////////////////////////

//Route to handle Post Request Call
app.post('/ownerSignup',function(req,res){
    
    console.log("Inside owner Sign Up Post Request");
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var oORt = "o";
        var sql = "INSERT INTO profileInfo(firstName, lastName, email, password, oORt) VALUES(" + 
        mysql.escape(firstName) +","+mysql.escape(lastName) +","+mysql.escape(email) +","+ mysql.escape(password) +","+ mysql.escape(oORt) +")";
    console.log("SQL query: "+sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                            console.log("Success");
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
});

//Route to handle Post Request Call
app.post('/ownerLogin',function(req,res){
    
    console.log("Inside owner Login Post Request");
        var email = req.body.email;
        var password = req.body.password;
        var sql = "SELECT *  FROM profileInfo WHERE email = " + 
                mysql.escape(email) + "and password = " + mysql.escape(password);
        console.log("SQL Query: "+sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0 && result[0].oORt=='o'){
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                        console.log("Success");
                        req.session.user = result[0].email;
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
});



//Route to handle Post Request Call
app.post('/ownerPricing',function(req,res){
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    console.log("Inside ownerPricing Post Request");

        var headline=req.body.headline;
        var propDescription=req.body.propDescription;
        var propType=req.body.propType;
        var bedroom=req.body.bedroom;
        var accomodates=req.body.accomodates;
        var bathrooms=req.body.bathrooms;

        var propPhotos=req.body.propPhotos;

        var country=req.body.country;
        var address=req.body.address;
        var city=req.body.city;
        var state=req.body.state;
        var zipcode=req.body.zipcode;

        var availableStart=req.body.availableStart;
        var availableEnd=req.body.availableEnd;
        var pricePerNight=req.body.pricePerNight;
        
        console.log("session: "+req.session.user);
        console.log(propPhotos);
        var sql = "INSERT INTO ownerproperty(propName, propPhotos, propDescription, propType, bedrooms, accomodates, bathroom,country,address,city,state,zipcode,availableStart,availableEnd,pricePerNight,email) VALUES(" + 
        mysql.escape(headline)+","+mysql.escape(propPhotos) +","+mysql.escape(propDescription) +","+mysql.escape(propType) +","+ mysql.escape(bedroom) +","+ mysql.escape(accomodates) +","+ mysql.escape(bathrooms) +","+ mysql.escape(country) +","+ mysql.escape(address) +","+ mysql.escape(city) +","+ mysql.escape(state) +","+ mysql.escape(zipcode) +","+ mysql.escape(availableStart) +","+ mysql.escape(availableEnd) +","+ mysql.escape(pricePerNight) +",'"+req.session.user+"'"+");";
   
        console.log("sql: \n"+sql);
    pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    
                    res.end("Invalid Credentials");
                }else{
                    console.log(result+"hi");
                    if(result.length!=0){
                        
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("Successful Login");
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});

//Route to handle Post Request Call
app.get('/ownerPropertyDashboard',function(req,res){
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    console.log("Inside ownerPropertyDashboard GET Request");
        
        var sql = "SELECT * FROM ownerproperty WHERE email = '"+req.session.user+"';"; 
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                        console.log("Success");
                       // console.log(result[0].propPhotos);
                        var resp = result[0].propPhotos.substring(1, result[0].propPhotos.length-1);
                      /*  console.log(resp);
                        console.log(JSON.stringify(result[1].propPhotos));
                        console.log(JSON.stringify(result[2].propPhotos));
                        console.log(JSON.stringify(result[3].propPhotos)); 
                        console.log("length"+result.length);*/
                        var i,file;
                        for(i=0;i<result.length;i++){
                            file=result[i].propPhotos.substring(1,result[i].propPhotos.length-1);
                         //   console.log(file);
                            var fileLocation = path.join(__dirname + '/uploads',file);
                            var img = fs.readFileSync(fileLocation);
                            var base64img = new Buffer(img).toString('base64');
                            result[i].propPhotos=base64img;
                          //  res.writeHead(200, {'Content-Type': 'image/jpg' });
                           // res.end(base64img);
                         //  console.log(base64img);
                        }
                       // console.log("get req:response:\n"+ JSON.stringify(result));
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end(JSON.stringify(result));
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});


//mainPage to handle Post Request Call
app.post('/mainPage',function(req,res){
    
    console.log("Inside mainPage Post Request");
        var destination = req.body.destination;
        var arrivalDate = req.body.arrivalDate;
        var departDate = req.body.departDate;
        var guests = req.body.guests;

        

        req.session.destination=req.body.destination;
        req.session.arrivalDate=req.body.arrivalDate;
        req.session.departDate=req.body.departDate;
        req.session.guests=req.body.guests;
      
        app.set('sendarrivaldate',arrivalDate);
        app.set('senddepartdate',departDate);
      /*  console.log(arrivalDate);
        console.log(departDate);

        console.log(req.session.destination);
        console.log(req.session.arrivalDate);
        console.log(req.session.departDate);
        console.log(req.session.guests);
*/
        
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    //console.log("Inside mainpage post Request");
        
        var sql ="SELECT * FROM ownerproperty WHERE city = "+mysql.escape(destination)+"and accomodates = "+mysql.escape(guests)+"and availableStart <= "+mysql.escape(arrivalDate)+" and availableEnd >= "+mysql.escape(departDate)+";";
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                        console.log("Success");
                    //    console.log("Response: "+JSON.stringify(result));
                    //    console.log("get req:response:\n"+ JSON.stringify(result[0].city));

                        app.set('searchResult',result);
                        var ans=app.get('searchResult');
                       // console.log("answer"+ans);
                      //  console.log("length: "+ans.length);
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("successful");
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});



//Route to handle Post Request Call
app.get('/getSearchResult',function(req,res){
    console.log("Inside get search result Post request");
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
        var ans=app.get('searchResult');
       // console.log("answer"+JSON.stringify(ans[0].propPhotos));
       // console.log("length: "+ans.length);
        
      //  ans.splice(2, 1);
      //  console.log("after splice: "+ans.length); 
                        var i,file;
                        for(i=0;i<ans.length;i++){
                            file=ans[i].propPhotos.substring(1,ans[i].propPhotos.length-1);
                           // console.log(file);
                            var fileLocation = path.join(__dirname + '/uploads',file);
                            var img = fs.readFileSync(fileLocation);
                            var base64img = new Buffer(img).toString('base64');
                            ans[i].propPhotos=base64img;
                          //  res.writeHead(200, {'Content-Type': 'image/jpg' });
                           // res.end(base64img);
                           //console.log(base64img);
                        }
                        //console.log(JSON.stringify(ans));
                        console.log("Success"); 
                        res.end(JSON.stringify(ans));

        /*
    console.log("Inside userProfile GET Request");
        
        var sql = "SELECT * FROM profileInfo WHERE email = '"+req.session.user+"';"; 
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                        console.log("get req:response:\n"+ JSON.stringify(result));
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end(JSON.stringify(result));
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });*/
    }
});


//Route to handle Post Request Call
app.get('/myTrips',function(req,res){
    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
  
        
    console.log("Inside mytrips GET Request");
        
    var sql= "SELECT * FROM ownerproperty LEFT JOIN travelerbookings ON ownerproperty.propName=travelerbookings.propName WHERE travelerbookings.tmail='"+req.session.user+"';";
        //var sql = "SELECT * FROM profileInfo WHERE email = '"+req.session.user+"';"; 
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                        console.log("Success");
                      //  console.log("get req:response:\n"+ JSON.stringify(result));

                        var i,file;
                        for(i=0;i<result.length;i++){
                            var datenew=JSON.stringify(result[i].bookdateStart);
                            var datesplice=datenew.substring(1,11);

                            var datenew1=JSON.stringify(result[i].bookdateEnd);
                            var datesplice1=datenew1.substring(1,11);

                            file=result[i].propPhotos.substring(1,result[i].propPhotos.length-1);
                           // console.log(file);
                            var fileLocation = path.join(__dirname + '/uploads',file);
                            var img = fs.readFileSync(fileLocation);
                            var base64img = new Buffer(img).toString('base64');
                            result[i].propPhotos=base64img;
                            
                            
                            result[i].bookdateStart=datesplice;
                            result[i].bookdateEnd=datesplice1;
                          //  res.writeHead(200, {'Content-Type': 'image/jpg' });
                           // res.end(base64img);
                           //console.log(base64img);
                        }

                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end(JSON.stringify(result));
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});



//handleBooking to handle Post Request Call
app.post('/handleBooking',function(req,res){
    
    console.log("Inside handleBooking Post Request");
   // console.log(req.body.bookpropertyname.propName);
    var sendPropName=req.body.bookpropertyname.propName;
   // console.log(sendPropName);

    if(!req.session.user){
        res.redirect('/mainPage');
    }else{
    //console.log("Inside handleBooking post Request");
         
        var sendarrivaldate=app.get('sendarrivaldate');
        var senddepartdate=app.get('senddepartdate');
      /*  console.log(sendarrivaldate);
        console.log(senddepartdate);
        console.log(req.session.user);*/
        var sql ="INSERT INTO travelerbookings (tmail,propName,bookdateStart,bookdateEnd) VALUES("+mysql.escape(req.session.user)+","+mysql.escape(sendPropName)+","+mysql.escape(sendarrivaldate)+","+mysql.escape(senddepartdate)+");";
        console.log("sql: \n"+sql);

        pool.getConnection(function(err,con){
        if(err){
        
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
          
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(result);
                    res.end("Invalid Credentials");
                }else{
                
                    if(result.length!=0){
                        console.log("Sucess");
                       /* console.log("Response: "+JSON.stringify(result));
                        console.log("get req:response:\n"+ JSON.stringify(result[0].city));

                        app.set('searchResult',result);
                        var ans=app.get('searchResult');
                        console.log("answer"+ans);
                        console.log("length: "+ans.length);*/
                            res.writeHead(200,{
                                'Content-Type' : 'text/plain'
                            })
                            res.end("successful");
                            
                    }
                    else{
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }

                }
            });
        }
    });
    }
});


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");