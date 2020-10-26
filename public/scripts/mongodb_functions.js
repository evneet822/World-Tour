function createUser(userObj, col_name){

    const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://evneet:1997evneet14@world-tour.a1i5i.mongodb.net/worldTourUsers?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "worldTourUsers";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection(col_name);

         // Construct a document                                                                                                                                                              
         

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(userObj);
         

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);


}

function checkUser(userObj, col_name,res){

    const { MongoClient } = require("mongodb");

    var loginuser = userObj["username"]
    var loginpass = userObj["password"]
    console.log("logged in user ////////////////"+loginuser,loginpass)
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://evneet:1997evneet14@world-tour.a1i5i.mongodb.net/worldTourUsers?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "worldTourUsers";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection(col_name);

         // Construct a document                                                                                                                                                              
         

         // Insert a single document, wait for promise so we can read it back
         col.find().toArray(function(err,data){
            //  var readData = data
             console.log(data)

             var alreadyExist = false;

    data.forEach(item => {
        if(item.firstname == userObj.username){
            if(item.password == userObj.password){
                alreadyExist = true;
                return
            }
            
        } 

    });
    if(alreadyExist){
        res.send({
            status:'Successful'
        })
        console.log("login successful")
        

    }else{
        res.send({
            status:'Unsuccessful'
        })
        console.log("Incorrect credentials!");

    }

             

         })         

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);


}


function read(){


    col.find().toArray(function(err, data) {
        
        console.log(data);

      
        
    });   

}

module.exports = {

    createUser,
    checkUser
}