const express=require('express');
const https=require('https');
const bodyParser=require('body-parser')

const app=express();
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', function(req,res){


    res.sendFile(__dirname+"/index.html");

   
})

app.post('/', function(req,res){
    const place=req.body.City;
    const ApiKey="62c2d12d21f1c7ddc5c9d3d50d399860";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+ApiKey+"&units=metric"
    https.get(url, function(response){
        response.on('data', function(data){
            const WeatherData= JSON.parse(data);
            console.log(WeatherData);
            const temp=WeatherData.main.temp;
            const feels_like=WeatherData.main.feels_like;
            const description=WeatherData.weather[0].description;
            const icon=WeatherData.weather[0].icon
            const ImageURL='http://openweathermap.org/img/wn/'+icon+'@2x.png'

            res.write("<h1>The weather is currently "+temp+" degress in "+place+", but feels like "+feels_like+" degree</h1>")
            res.write( "<h1>and it has "+description+".</h1>");
            res.write("<img src="+ImageURL+">");
             

            res.send();
        })

    });



})








app.listen(3000, function(){
    console.log('Server started on port 3000');
})