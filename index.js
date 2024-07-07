import express from "express";
import bodyParser from "body-parser";


// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

var postList=[];

class post{ 
    constructor(title,content){
    this.title=title;
    this.content=content;
    }
}


//main host
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        posts:postList,
    });
})

//about page
app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.get("/create",(req,res)=>{
    res.render("create.ejs");
})

//for delete post
app.post("/",(req,res)=>{
    const id = req.body.button;
    postList.splice(id,1);
    res.render("index.ejs",{
        posts:postList,
    });
})


let title;
app.post("/create",(req,res)=>{
    if(title != req.body.title && req.body.title != null ){
    title= req.body.title;
    let content = req.body.content;
    postList.push(new post(title,content));
    }
    if(title==null){
        alert("can't enter empty title")
    }
    res.render("index.ejs",{
        posts:postList,
    });

    console.log(postList);
})




var idForEdit;
app.post("/edit",(req,res)=>{
    var id = null;
    id= req.body.button;
    if(id !== undefined){   
        idForEdit = id;
    } 
    var title=req.body.title;
    var content=req.body.content;
    if(title !== undefined && idForEdit!==undefined){
        postList[idForEdit].title=title;
        postList[idForEdit].content=content; 
    }
    res.render("edit.ejs",{
        post:postList[idForEdit],
    }); 
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});