const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
const port=8080;

app.listen(port,()=>{
    console.log(`${port} is listening!`)
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,("/views")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));


let posts=[
    {
        id:uuidv4(),
        username:"shivom",
        content:"Better go DIE somewhere!"
    },
    {
        id:uuidv4(),
        username:"stuti",
        content:"I am hungryyyy TT"
    },
    {
        id:uuidv4(),
        username:"mayank",
        content:"Bakchodi nhi rukni chahiye"
    },
]

app.get("/",(req,res)=>{
    res.send("server is working well!!")
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs",{posts});
    
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});

    //res.send("Post send");
    //res.render("index.ejs",{posts});

    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs",{post});
})



app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let newContent=req.body.content;
    console.log(newContent);
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    //res.send("Patch is working!");
    console.log("patchingg");
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})