const express = require('express');
const router = express.Router();
const multer = require('multer')
const productcontroller = require('../controller/productcontroller');
const isauth = require('../middleware/isauth');

const filestorage = multer.diskStorage({
    destination : function( req, file ,cb){
        cb(null, './Images')
    },
    filename : function(req, file , cb){
        cb(null, file.originalname)
    }
})

const filefilter = ( req, file , cb) => {
    if( file.mimetype == 'images/png' || file.mimetype == 'images/jpg' || file.mimetype == 'images/jpeg'){
        cb(null , true)
    }
    else{
        cb(null,false)
    }
}

const upload = multer({storage : filestorage, fileFilter: filefilter, limits: { fileSize : 1024 * 1024 * 5}});
router.post('/addproduct',isauth, upload.single('image'), productcontroller.addproduct);
router.get('/getproducts',isauth,productcontroller.getproducts);
router.get('/getproduct/:id',isauth, productcontroller.getsingleproduct);

module.exports = router;