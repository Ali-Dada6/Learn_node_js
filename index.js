const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

mongoose.connect("mongodb+srv://AliDada:AliDB2025Node@myfirstnodejscluster.h5wcvsk.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstNodeJSCluster")
.then(()=>{
    console.log("connected successfuly");
}).catch((error)=>{
    console.log("error with connecting with DB", error);
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello In Node JS Project");
})
app.get("/home", (req, res) => {
    res.send("Hello In Home");
})

app.get("/numbers", (req, res) => {
    let numbers = ""
    for(let i = 1; i <= 100; i++) {
        numbers += i + ' - ';
    }
    // res.send(`The Numbers Is: ${numbers}`);
    // res.sendFile(__dirname + "/views/numbers.html");
    res.render("numbers.ejs",{
        name: "ali",
        numbers: numbers
    });

})

app.get("/findSummation/:number1/:number2", (req, res) => {
    const number1 = req.params.number1;
    const number2 = req.params.number2;

    const total = Number(number1) + Number(number2);
    res.send(`The Total Is: ${total}`);
})

app.get("/sayHello", (req, res) => {
    // console.log(req.body);

    // console.log(req.query);

    // res.send(`Hello ${req.body.name}, Age Is: ${req.query.age}`);
    res.json({
        name: req.body.name,
        age: req.query.age
    })
})

app.put("/test", (req, res) => {
    res.send("Hello world");
})

app.delete("/testingDelete", (req, res) => {
    res.send("delete in app");
})

// ====== ARTICLES ENDPOINTS ======
app.post("/articles", async (req, res) => {
    const newArticle = new Article()

    const artTitle = req.body.artTitle
    const artBody = req.body.artBody

    newArticle.title = artTitle
    newArticle.body = artBody
    newArticle.numbersOfLikes = 0
    await newArticle.save()

    // res.send("the new articles gas been stored");
    res.json(newArticle);
})

app.get("/articles", async(req, res) => {
    const articles = await Article.find()
    res.json(articles);
})

app.get("/articles/:articleID", async(req, res) => {
    const id = req.params.articleID;
    const articles = await Article.findById(id);
    res.json(articles);
})

app.delete("/articles/:articleID", async(req, res) => {
    const id = req.params.articleID;
    const articles = await Article.findByIdAndDelete(id);
    res.json(articles);
})

app.get("/showArticles", async (req, res) => {
    const articles = await Article.find();
    res.render("articles.ejs", {
        allArticles: articles
    })
})

app.listen(3000, () => {
    console.log("App Is Running in PORT 3000");
})
