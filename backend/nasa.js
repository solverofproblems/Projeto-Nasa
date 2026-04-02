import express from "express"
import dotenv from "dotenv" 
import cors from "cors";

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = express();

app.use(cors());
app.use(express.json());

app.get('/getPicture', async (req, res) => {

    const data = req.query.date; 

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&date=${data}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {

        res.json({

            title : data.title,
            date : data.date,
            explanation : data.explanation,
            url : data.hdurl

        });

    })
    .catch(error => {

        console.log(error);

    })



});

app.listen(process.env.PORT, () => {


    console.log('Servidor rodando normalmente.');


});