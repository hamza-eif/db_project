import express from 'express'
import cors from 'cors'
const app=express();
import StudentRoutes from './Routes/Student.js'

app.use(cors({
  origin: '*', // Allow all origins (can be restricted to specific domains)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
const port=process.env.PORT || 3001 ;

app.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.send('Hello from test route');
  });


  // APIS
// setup messaging routes:
app.use('/api/student',StudentRoutes);
// app.use('/api/sections',SectionRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})