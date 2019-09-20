module.exports.DateToSqlDate = (date) => {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}

module.exports.getPlaceByLabel = async (label, db) => {
    try {
        let query = "select idPlace from place where label = ?";
        let [ queryRows, queryFields ] = await db.query(query, [label]);
        if(queryRows.length < 1) return null;
        return queryRows[0].idPlace;
    } catch (err){
        console.error(err);
    }
    
}