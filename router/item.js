// import required essentials
const express = require('express');
// create new router
const router = express.Router();

// create a JSON data array
let data = [
    { poolId: 1, title: [1,2,3,4,5]   },
    { poolId: 2, title: [1,2,3,4,5,6] },
   
];


router.get('/', function (req, res) {
    res.status(200).json(data);
});





router.post('/add', function (req, res) {
   // const poolpoolId = parseInt(req.params.poolId);
    const {poolpoolId,arrray}=req.body;
  
    const poolx=parseInt(poolpoolId);
    const found = data.find(function (item) {
        return item.poolId === poolx;
    });
    const index=data.findIndex(function (item) {
        return item.poolId===poolx;
    })
    if (found) {
        
        if(found.title==arrray){
            res.send("appended")
        }else{
           newString=arrray.slice(1)
           newstring1=newString.slice(0,newString.length-1)
           newstring2=newstring1.split(',')
           for(let i=0;i<newstring2.length;i++){
            newstring2[i]=parseInt(newstring2[i])
           }
           x=found.title.concat(newstring2)
             data[index]={
                 poolId:found.poolId,
                 title:x
         };
            res.send("appended");
        }
    }else{
        data.push({
            poolId:poolx,
            title:arrray,
        })
       // res.status(400).json(data)
        res.send("inserted")
    }

});


router.post('/:id', (req, res) => {
    const poolId = req.params.id
    console.log(poolId)
    const poolx=parseInt(poolId);
    const found = data.find(function (item) {
        return item.poolId === poolx;
    });
 
    const initialValue = 0;
    const sumWithInitial = found.title.reduce(
     (previousValue, currentValue) => previousValue + currentValue,
  initialValue
   );
    const avg=sumWithInitial/found.title.length
    console.log(avg)
    res.status(200).json({
        poolId:poolId,
        percentile:avg
    })

})
module.exports = router;