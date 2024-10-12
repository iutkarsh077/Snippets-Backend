import express from "express";
import router from "./routes/router.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: ['https://snippets-frontend-beta.vercel.app', 
        'https://snippets-frontend.onrender.com'
    ]
}))

//['https://snippets-fornt.netlify.app', 'https://snippets-frontend-beta.vercel.app']
app.get("/api", (req, res)=>{
    console.log("Hii This is a Backend Call");
    return res.json("Hii This is a Backend Call");
})

app.use("/api/v1", router);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})