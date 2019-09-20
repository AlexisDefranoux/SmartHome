var express=require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json([
        {id: 1, content: 'Évènement 1'},
        {id: 2, content: 'Évènement 2'}
    ]);
});

router.get("/:id", (req, res) => {
    if (req.params.id == 1) {
        res.status(200).json({id: 1,content: "Évènement 1"});
    }else if(req.params.id == 2){
        res.status(200).json({id: 1,content: "Évènement 1"});
    }else{
        res.status(404);
    }
});

module.exports=router;