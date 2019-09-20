async function askedConsignes(db, transformConsignes) {
    //select label, temperature from place join consigne on place.idPlace = consigne.idPlace 
    try {
        let [ queryRows, queryFields ] = await db.query("select label, temperature from place join consigne on place.idPlace = consigne.idPlace");
        res = {}
        queryRows.forEach(element => {
            res[element.label] = {"max": element.temperature+transformConsignes, "min": element.temperature+transformConsignes};
        });
        return res;
    } catch(err) {
        console.log(err)
        return err;
    }
}
module.exports.askedConsignes = askedConsignes;

async function setMod(db, points, transformConsignes) {
    //select tMin, tMax, resolveDate from mishap join mode on mode.idMode = mishap.idMode where idPlace = 52 and idState <> 3 and mishapDate >= (select CURDATE()) 
    try {
        const query = "SELECT tMin, tMax, resolveDate, idMishap FROM mishap JOIN mode ON mode.idMode = mishap.idMode where idPlace = 52 and idState <> 3 and mishapDate >= (select CURDATE())";
        let [ queryRows, queryFields ] = await db.query(query);

        if (queryRows.length < 1){
            return points;
        }
        let res = queryRows[0];
        //console.log(res.resolveDate);
        
        try {
            var id = res.idMishap;
            let [ queryRows, queryFields ] = await db.query('UPDATE mishap SET idState = 2 WHERE idMishap = ?', [id]);
        } catch(err) {
            console.log(err)
        }
        
        res.tMin+=transformConsignes;
        res.tMax+=transformConsignes;
        res.db
        res.resolveDate = new Date(res.resolveDate).valueOf();
        return res;
    } catch(err) {
        console.log(err)
    }
}

async function setMishaps(db, points, transformConsignes) {
    //Select * in mishap wher status <> done and user = MQTT and desk like %[tag]%
    try {
        const query = "Select label from mishap join place on place.idPlace = mishap.idPlace where idState <> 3 and idUser = 6 and description like '%[WO]%' "
        let [ queryRows, queryFields ] = await db.query(query);
        queryRows.forEach(element => {
            points[element.label] = {"max": 12+transformConsignes, "min": 8+transformConsignes};
        });
        return points;
    } catch(err) {
        console.log(err)
    }
}

module.exports.getConsignes = async function(db, transformConsignes) {
    var points = await askedConsignes(db, transformConsignes);
    // console.log(points);
    points = await setMod(db, points, transformConsignes);
    // console.log(points);
    points = await setMishaps(db, points, transformConsignes);
    // console.log(points);
    return points;
}