import express from 'express'
import connectDatabase from './config/database.js'
const app = express()

import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import storeRoutes from './routes/store.js'
import offerRoutes from './routes/offer.js'
import middlewareRoutes from './routes/middleware.js'

app.use(cors());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(express.json({limit:"50mb"}));
app.use(cookieParser("SECRET"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
//   }));
// app.use(express.static(path.join(__dirname, "public")));


// routes

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/store",storeRoutes);
app.use("/api/offer",offerRoutes);
app.use("/api/middleware",middlewareRoutes)

// error middleware 
app.use( (err, req, res, next) =>{
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

// port 
const PORT = process.env.PORT || 4000;

// establishing database connection before starting server
connectDatabase().then(()=>{
    app.listen(PORT, () => console.log("Server running on PORT : " + PORT))
}).catch((error) => console.log(error.message));