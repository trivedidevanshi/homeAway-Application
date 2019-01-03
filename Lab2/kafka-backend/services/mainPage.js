var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    console.log("Inside kafka post mainPage.");
    var destination = msg.destination;
    var arrivalDate = msg.arrivalDate;
    var departDate = msg.departDate;
    var guests = msg.guests;
    
    var queriedarrivalDate = Date.parse(arrivalDate);
    var querieddepartDate = Date.parse(departDate);

    var newarr = [];

    users.aggregate([
        { $unwind: '$properties' },
        { $match: { 'properties.city': destination, 'properties.accomodates': { $gte: guests }  } },
        { $project: { _id: 0, properties: 1 } }
    ],
        function (err, user) {
            if (err) {
                console.log("These is an error in extracting searched props.");
                callback(err, "Error in extracting searched props");

            } else {
                if (user.length == 0) {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!user length is 0!!!!!!!!!!!!!!!!!!!!!!!!!");
                    callback(null, newarr);
                }
                //console.log("------the result is : ", user);

                console.log("!!!!!!!!!!!!!!!!!!!!!!user length is !!!!!!!!!!!!!!!!!!!!!!!!!",user.length);
                for(let i=0; i<user.length; i++){
                    if(user[i].properties.bookeddates == undefined){
                        //no block dates for this prop. So push.
                        console.log("This prop is not booked by anyone and pushed to array: \n",user[i].properties);
                       // newarr.push(user[i].properties);

                        if(Date.parse(user[i].properties.availablestart)<=queriedarrivalDate && querieddepartDate<=Date.parse(user[i].properties.availableend)){
                            console.log("------------------this prop falls in date can be booked-----------------------",user[i].properties.propname)
                            newarr.push(user[i].properties);
                            console.log("!!!!!!!!!!!!!!!!!!!!!!",newarr);
                            
                        }else{
                            console.log("------------------this prop DOES NOT fall in date cannt be booked-----------------------",user[i].properties.propname)
                        }

                    }else{
                        //This prop is booked by someone.
                        
                        console.log("\n"+i+"th user prop : ",user[i].properties.bookeddates);
                        console.log("\n"+i+"bookeddatelength is: ",user[i].properties.bookeddates.length);

                        var alreadybookedstartdate = [];
                        var alreadybookedenddate = [];

                        for(let k=0; k<user[i].properties.bookeddates.length;k++){
                            console.log("\n"+i+"th user prop's start blockdates are : ",user[i].properties.bookeddates[k].bookdatestart);
                            alreadybookedstartdate.push(Date.parse(user[i].properties.bookeddates[k].bookdatestart));
                            alreadybookedenddate.push(Date.parse(user[i].properties.bookeddates[k].bookdateend));
                            
                        }
                        console.log("\n"+i+"th user prop's start blockdates ARRAY : ",alreadybookedstartdate);
                        console.log("\n"+i+"th user prop's start blockdates ARRAY Length: ",alreadybookedstartdate.length);

                        console.log("-------------------------got blockdate array---------------------------------")
                        var flag=true;
                        for(let m=0; m<alreadybookedstartdate.length;m++){
                            if(Date.parse(user[i].properties.availablestart)<=queriedarrivalDate && querieddepartDate<=Date.parse(user[i].properties.availablestart)){
                                if(alreadybookedstartdate[m]<=queriedarrivalDate && querieddepartDate<=alreadybookedenddate[m]){
                                    //it is booked for queried date! Dont push. Make flag false.
                                    flag=false; //put break later
                                    break;
                                }
                            }
                        }
                       
                        if(flag==true){
                            //does not clash with any dates so push to array
                            console.log("This prop is not booked by anyone and pushed to array: \n",user[i].properties);
                            newarr.push(user[i].properties);
                            console.log("!!!!!!!!!!!!!!!!!!!!!!",newarr);
                        }
                    }
                    console.log("!!!!!!!!!!!!!!!!!!!!!!",newarr);
                }
                console.log("!!!!!!!!!!!!!!!!!!!!!!",newarr);
                callback(null,newarr);
            }
        });

}
exports.handle_request = handle_request;
