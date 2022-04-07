const express = require('express')
const minimist = require("minimist")
const app = express()
const db = require("./database.js")
var md5 = require("md5")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const args = minimist(process.argv.slice(2))
console.log(args)
args["port"]
const port = args.port || 5000

//const logging = (req,res,next) => {
  //  console.log(req.body.number)
  //  next()

//}


const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%',port))
})





app.get('/app/',(req,res, next) => {
    res.type('text/plain')
    res.json({"message":"your API works! (200)"});
    res.status(200).end('200 OK')
})

app.post("/app/new/user",(req,res,next) => {
    let data = {
      user: req.body.username,
      pass: req.body.password
    }
    const stmt = db.prepare('INSERT INTO userinfo (username, password) VALUES (?,?)')
    const info = stmt.run(data.user, data.pass)
    res.status(200).json(info)
})

app.get('/app/flips/:number/',(req,res) =>{
  res.setHeader("showing", "alex")
    res.status(200).json({'raw': coinFlips(req.params.number), 'summary': countFlips(coinFlips(req.params.number))})
    res.type("text/plain")
})

//query
//app.get('/app/echo/',(req,res)=> {
 // res.setHeader("showing", "alex")
//res.status(200).json({'message': req.query.number})

//})


//app.get('/app/echo/',logging,(req,res)=> {
  //  res.status(200).json({'message': req.body.number})
    
  //  })

  function coinFlip() {
        return (Math.floor(Math.random()*2) == 0) ? 'heads' : 'tails';
     }
        

app.get('/app/flip/',(req,res) =>{
  res.setHeader("showing", "alex")
var flip = coinFlip()//need to create coinFlip above
res.status(200).json({'flip': flip})
res.type("text/plain")
})

//lol
app.get('/app/flip/call/heads',(req,res) =>{
  res.setHeader("showing", "alex")
var flipHead = "heads"//need to create coinFlip above
res.status(200).json(flipACoin(flipHead))
res.type("text/plain")
})


app.get('/app/flip/call/tails',(req,res) =>{
  
var flipTails = "tails"//need to create coinFlip above
res.status(200).json(flipACoin(flipTails))
res.type("text/plain")
})



function countFlips(array) {
    
  var numberH= 0;
    var numberT= 0;
    if(array.length === 1 && array[0]==="heads"){
      numberH++;
      return { "heads": numberH };
    }
    if(array.length === 1 && array[0]==="tails"){
      numberT++;
      return {  "tails": numberT };
    }
    for(var i=0;i<array.length; i++){
      if(array[i]===("heads")){
        numberH++;
      }
      else if(array[i]===("tails")){
        numberT++;
      }
    }
    return { "heads": numberH, "tails": numberT };
    }


    function coinFlips(flips) {
      var coinArray = [];
      for(var x=0; x<flips; x++){
        coinArray.push(coinFlip());
      }
      return coinArray;
    }

    function flipACoin(call) {
      var theCoin = coinFlip();
        if(theCoin===call){
        return {"call": call, flip: theCoin, result: "win"};
        }
        else{
          return {"call": call, flip: theCoin, result: "lose"};
        }
        
      }


    app.use(function(req,res){
      res.status(404).send('404 NOT FOUND')
    })
