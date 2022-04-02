const express=require("express");
const app=express();
const https=require("https");

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})


app.post("/",function(req,res){
    
    const query=req.body.CityName;
    const apiKey="64cb27f52e9e4eb2caf0fb21167f9461";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey+ "&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);                       //this makes the data into JSON format
            const temp=weatherData.main.temp;
            console.log(weatherData.weather[0].description);            //u can get this path through JSON pro extension on G-chrome

            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>weather currently is "+weatherData.weather[0].description+"</p>")
            res.write("<h1>The temperatue in "+query+" is "+temp+" degree celcius </h1>");    //res.write is written if we want multiple requests to be sent          
            res.write("<img src=" + imageURL + ">")
            res.send();                                   //we can have only 1 res.send in the entire website..only 1 response will be sent
        })
    })   

})




app.listen(3000,function(){
    console.log("server is running on port 3000");
})