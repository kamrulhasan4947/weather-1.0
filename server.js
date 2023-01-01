const express = require("express")
const path = require('path')
const https = require('https')
const bodyParser = require('body-parser')
const cors = require("cors")
const public = path.join(__dirname, "public")
const port = process.env.PORT || 5000
app = express()
app.use(express.json())
app.use(express.static(public))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.set('view engine', 'ejs')



app.get("/", (req, res)=>{
    // res.sendFile(path.join(public, 'templates/weather.html'))
    res.render('weather')
})

app.post("/", (req, res)=>{
    const postedData = req.body
    const query = postedData.cityname+','+postedData.countryname
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=cb8bfed75aed63f7bc4b76917e47e675&units=metric#"
    https.get(url, (respons) => {
        respons.on("data", (data) =>{
           res.render('weatherdata', {weatherData: JSON.parse(data)})
        })
    })
    
})


app.listen(port, ()=>{
    console.log(`Server is running on port ====>${port}`)
})