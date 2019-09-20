async function getPlaceByName(conn, place){
    let [ queryRows, queryFields ] = await conn.query('SELECT idPlace FROM place where placeName = ?', [place]);
    if (! Array.isArray(queryRows) || queryRows.length < 1) return null;
    //console.debug(queryRows);
    return queryRows[0].idPlace;
}

async function addPlace(conn, place) {
    let [queryRows, queryFields] = await conn.query('INSERT INTO place values(NULL, ?, 0)',[place])
    if (queryRows.code == 'ER_DUP_ENTRY') return 0; 
    console.log(queryRows);
    if(queryRows.affectedRows == 1) return queryRows.insertId;

    return null;
}



module.exports.getPlaceByName = getPlaceByName;
module.exports.addPlace = addPlace;