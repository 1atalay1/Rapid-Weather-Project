import bodyParser from "body-parser";
import axios from "axios";
import express from "express";

const app=express();
const PORT=3000;
var API_KEY;  // Enter your Weatherstack API Key here

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
        res.render("index.ejs");
});

app.post("/getcity",async (req,res)=>{
        const place= req.body.place;
        var route="https://api.weatherstack.com/current?access_key="+API_KEY+"&query="+place;
        const response =await axios.get(route);
        const data=response.data;
        if(data.location){
        const local_time=data.location.localtime;
        const location=data.request.query;
        const degree=data.current.temperature;
        const weather_image=data.current.weather_icons;
        res.render("index.ejs",{time:local_time,location:location,temperature:degree,image:weather_image});
        }
        else{
                var message=place+"could not be found please try again!";
                res.render("index.ejs",{message:message});
        }
        

});

app.listen(PORT,()=>{
        console.log("Running!");
});

