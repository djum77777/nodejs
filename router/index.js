const express = require("express");
const { getdata, postdata, deletedata, editdata } = require("../Controllers");
const router = express.Router()

router.get("/",getdata)
router.post("/",postdata)
router.delete ("/:ID",deletedata)
router.put ("/:ID",editdata)

module.exports=router;