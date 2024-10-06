import express from 'express'
import cors from 'cors'
const app=express();
app.use(cors())
const port=process.env.PORT || 6000;

app.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.send('Hello from test route');
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})