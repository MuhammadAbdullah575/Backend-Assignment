const express=require('express');
const studentRouter=require('./src/student/routes');
const loginRouter=require('./src/register/routes');
const productRouter=require('./src/products/routes');
const stripe=require('./src/stripe/routes')
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());
const port=3000;
app.get('/',(req,res)=>{
    res.send('Hello World');
}
);


app.use('/students',studentRouter);
app.use('/login',loginRouter);
app.use('/products',productRouter);
 app.use('/stripe',stripe);
// //  app.use('/stripe',(req,res)=>{
// //     res.send('Hello World');
// // });
// app.post('/stripe',(req,res)=>{
//     res.send('Hello World');
// });


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
}   );
