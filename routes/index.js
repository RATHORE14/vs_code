// const { error } = require('console');
var express = require('express');
var router = express.Router();
const fs = require("fs");
const { type } = require('os');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { manku : 'Expressssss' });
// });

// router.get("/",(req,res)=>{
//     res.render("forms")
// })
// router.get("/login",(req,res)=>{
//   res.send(req.query)
// })
// router.post("/login",(req,res)=>{
//   res.send(req.body)
// })

// module.exports = router;


// router.get("/",(req,res)=>{
//       res.render("vs")
// }) 
// router.get("/creatfile",(req,res)=>{
//       fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
//           if(err) res.send(err);
//           else res.redirect("back")
//       })
// }) 

// module.exports = router;


// router.get("/",(req,res)=>{
//       fs.readdir(`./uploads`,{withFileTypes:true},function(err, files){
//             res.render("vscode",{files})
//       })
//        }) 


// router.get("/createfile",(req,res)=>{
//             fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
//             if(err) res.send(err)
//             else res.redirect("back")
//             })
//        }) 

// router.get("/createfolder",(req,res)=>{
//             fs.writeFile(`./uploads/${req.query.foldername}`,"",function(err){
//             if(err) res.send(err)
//             else res.redirect("back")
//             })
//        })  
router.get('/', function (req, res) {
  fs.readdir(`./uploads`, { withFileTypes: true }, function (err, files) {
    res.render("vscode", { files })
  })
});


router.get('/back', function (req, res) {
   res.redirect("back")
});

router.get('/file/:filename', function(req, res) {
  fs.readdir(`./uploads`, {withFileTypes: true}, function(err, files){
    fs.readFile(`./uploads/${req.params.filename}`, "utf8", function(err, filedata){
      res.render("opened", {files, filename: req.params.filename, filedata});
    })
  })
});

router.post('/update/:filename', function(req, res) {
  fs.writeFile(`./uploads/${req.params.filename}`, req.body.data, function(err){
    res.redirect("back");
  })
});


router.get('/delete/:type/:filename', function(req, res) {
  if(req.params.type === "folder"){
    fs.rmdir(`./uploads/${req.params.filename}`, function(err){
      res.redirect("back");
    })
  }
  else{
    fs.unlink(`./uploads/${req.params.filename}`, function(err){
      res.redirect("back");
    })
  }
});

router.get('/createfile', function (req, res) {
  fs.writeFile(`./uploads/${req.query.filename}`, "", function (err) {
    if (err) res.send(err);
    else res.redirect("back")
  })
});
router.get('/createfolder', function (req, res) {
  fs.mkdir(`./uploads/${req.query.foldername}`, function (err) {
    if (err) res.send(err);
    else res.redirect("back")
  })
});
module.exports = router;