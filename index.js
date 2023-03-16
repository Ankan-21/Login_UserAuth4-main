const express=require('express');
const mongoose=require('mongoose');
const cookieparser=require('cookie-parser')
const userAuth=require('./middleware/userAuth');
const adminAuth=require('./middleware/adminAuth');
const session=require('express-session')
const flash=require('connect-flash');

const app=express();


const port=process.env.PORT || 2500;

app.use(express.urlencoded({extended:true}));

app.use(flash());
app.use(cookieparser());
app.use(session({
    cookie:{maxAge:5000},
    secret:'ankan',
    resave:false,
    saveUninitialized:false
}))

app.set('view engine','ejs');
app.set('views','views')

app.use(userAuth.authjwt)
app.use(adminAuth.authejwt)

const userroute=require('./routes/userRoute')
app.use(userroute)
const AdminRoute=require('./routes/AdminRoute')
app.use('/admin',AdminRoute)

// const apiRout = require("./routes/apirout");
// app.use(apiRout)


const DB="mongodb+srv://ankandb:vnkhSzkCKB5LXe20@cluster0.jmt30c3.mongodb.net/verify_email"
mongoose.connect(DB,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(result=>{
    app.listen(port,()=>{
        console.log("DB Connected....");
        console.log(`server running http://localhost:${port}`);
    })
}).catch(err=>{
    console.log(err);
})