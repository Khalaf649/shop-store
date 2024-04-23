const path = require('path');
const fs = require('fs');
const maindir = require('../util/path');
const { json } = require('body-parser');

module.exports = class {
    constructor(title, price,imageUrl,description) {
        this.title = title;
        this.price = price;
        this.imageUrl=imageUrl;
        this.description=description;
        
    }

 save()
 {
    let p=path.join(maindir,'data','products.json');
    fs.readFile(p,(err,data)=>{
        let arr=[];
        if(!err)
        {
          arr=JSON.parse(data);
        }
        arr.push(this);
        fs.writeFile(p,JSON.stringify(arr),(err)=>{
            if(err)
            {
                console.log(err);
            }
        })
    })
}
static  fetch(cb)
{
    let p = path.join(maindir, 'data', 'products.json');
    fs.readFile(p,(err,data)=>{
        if(err)
         cb([]);
        else
     cb(JSON.parse(data));
    })
   

}

};
