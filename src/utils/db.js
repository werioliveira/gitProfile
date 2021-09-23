const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')
/*        // BLOCK OF CODE TO SAVE ON gitprofile.db searchs
const path = require('path')
let pathing = path.join(__dirname)

    const db = new sqlite3.Database(pathing+'/gitprofile.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
    });

*/
db.run('CREATE TABLE IF NOT EXISTS latestSearch(search text)')

var getLatest = function(){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM latestSearch',(err,result)=>{
                if(err){
                    reject(err)
                    console.log('promisse error')
                }else{
                    resolve(result)
                }
            })
        })
  };
module.exports = {
    db,
    getLatest
}