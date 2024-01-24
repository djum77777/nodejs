//install npm validator, terminal : npm i colors
const colors=require('colors');
console.log('hello'.green); // outputs green text

//install npm validator, terminal : npm i lodash
const lodash=require('lodash') //lodash npm yg bnyk dipakai u/manipulasi data
console.log(lodash.capitalize("mariana"));
console.log(lodash.isString("makan"));

//install npm validator, terminal : npm i validator
const valid=require('validator'); //slh 1 fungsinya ada check email dgn panggil fungsi isEmail
//const { default: isEmail } = require('validator/lib/isemail');
const checkEmail =(email)=>
{
    
    if(valid.isEmail(email))
    {
        console.log("email da benar");
    }
    else
    {
        console.log("ini bkn email");
    }

}
checkEmail("mariana.djum@yahoo.com")

//install npm moment : npm install moment 
//webnya https://momentjs.com/
const time =require("moment")
time.locale("id") //ubah format jd bahasa indonesia 
const waktu=time().format();
console.log(waktu);
console.log(time().format('MMMM Do YYYY, h:mm:ss a')); 
console.log("mariana aja");