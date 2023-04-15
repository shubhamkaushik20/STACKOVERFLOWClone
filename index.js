const express=require('express');
const dotenv = require("dotenv");
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const passport=require("passport")
//bring all routes
const auth=require('./routes/api/auth');
const profile=require('./routes/api/profile');
const questions=require('./routes/api/questions')




const app=express();

//MIDDLEWARE for  passport bodyparser
app.use(passport.initialize());

//config forJWT Strategy
require('./strategies/jsonwtStrategy')(passport);



app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



dotenv.config({path:"./config.env"});
//mongoDB configuration
const db=require('./setup/myurl').mongoURL;

//attempt to connect to database
mongoose.connect(db)
.then(()=>console.log("mongodb connected"))
.catch(err =>console.log(err));


//route just for testing
app.get('/',(req,res)=>{
    res.send('hey there big stack');
});

//actual routes

app.use('/api/auth',auth)
app.use('/api/questions',questions)
app.use('/api/profile',profile)


const port=process.env.PORT||3000;

app.listen(port,()=>console.log(`app is running at port${port}`))