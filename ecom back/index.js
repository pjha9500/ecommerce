const express=require('express');
const app=express();
const bodyparser=require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
const mysql=require('mysql2');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:'node-complete',
    password: "Pjha@11810995"
  })

app.get('/cartitems',(req,res,next)=>{
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM ecomcart", function (err, result, fields) {
      if (err) throw err;
      else{
        
        res.json(result);

      }
      
    });
  });
})


app.post('/cartitems',(req,res,next)=>{
  console.log(req.body);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO ecomcart (productid,name,price,quantity,img_src) VALUES ('${req.body.productid}','${req.body.name}','${req.body.price}','${req.body.quantity}','${req.body.img_src}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted",result);
    });
  });
res.status(200).send();
})


app.put('/cartitems',(req,res,next)=>{
  console.log(req.body);
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `UPDATE ecomcart SET name='${req.body.name}', price='${req.body.price}', quantity='${req.body.quantity}',img_src='${req.body.img_src}' WHERE productid='${req.body.productid}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record updated");
    });
  });
res.status(200).send();
})

app.get('/cartitems/:productid',(req,res,next)=>{
  console.log(req.params);
  
  con.connect(function(err) {
      if (err) throw err;
      con.query(`SELECT * FROM ecomcart  WHERE productid='${req.params.productid}'`, function (err, result, fields) {
        if (err) throw err;
        else{
          console.log("result");
          res.json(result[0]);

        }
        
      });
    });
})

app.delete('/cartitems/:productid',(req,res,next)=>{
  console.log(req.params.productid);
  con.connect(function(err) {
    if (err) throw err;
    var sql = `DELETE FROM ecomcart WHERE productid = '${req.params.productid}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log('1 row deleted');
    });
  });
  res.status(200).send();

})
app.listen(3000);