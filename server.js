const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const Product = require('./product');
const DB = 'mongodb+srv://Aarsh:Aarsh"12"@cluster0.91ortpx.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

//post api
app.post("/api/add_product", async (req, res) => {

    console.log("Result", req.body);

    let data = Product(req.body);

    try{
        let dataToStore = await data.save();
        res.status(200).json(dataToStore);
    }catch(error){
        res.status(400).json(
            {'status' : error.message}
        )

    }
    // const pdata = {
    //     "id": productData.length + 1,
    //     "pname": req.body.pname,
    //     "pprice": req.body.pprice,
    //     "pdetails": req.body.pdetails,
    // };

    // productData.push(pdata);

    // res.status(200).send({
    //     "status_code": 200,
    //     "message": "Product added successfully",
    //     "product": pdata,
    // })
})

app.get("/api/get_product",async (req, res) => {

    try {
        let data = await Product.find();
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json({
            'status' : error.message
        })
    }
})

//update
app.patch("/api/update/:id",async (req,res)=>{ //patch method no need to give whole data only the field to change

    let id = req.params.id;
    let updatedData = req.body;
    let options = {new: true};

    try {
        const data = await Product.findByIdAndUpdate(id.updatedData, options);
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json({
            'status' : error.message
        })
    }
})

//delete
app.delete("/api/delete/:id",async (req,res)=>{

    let id = req.params.id;

    try {
        const data = await Product.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            'status' : error.message
        })
    }
})

//connect
mongoose
    .connect(DB)
    .then(() => {
        console.log('Connected to Database Successfully');
    })
    .catch((e) => {
        console.log(e.message);
    });
app.listen(PORT, () => {
    console.log("Connected to port " + PORT);
})





