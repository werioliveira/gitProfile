const api = require('../utils/api')
const {db, getLatest} = require('../utils/db')
async function index(req,res){
    var latestSearch = []
    let result = await getLatest()
    latestSearch.push(result)
    return res.render('index',{latest: latestSearch[0], user: [],repos: [] })
}
async function getProfile(req,res){
    const user = 'users'+'/'+req.body.user
    const repos = 'users'+'/'+req.body.user+'/repos'
    var latestSearch = []

    db.run(`INSERT INTO latestSearch(search) VALUES(?)`, req.body.user, function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
    try{
        const profile = await api.get(user)
        const repositories = await api.get(repos+'?sort=created&direction=desc')
        const filterRepo = []
        let result = await getLatest()
        latestSearch.push(result)
        for(i =0; i< 3;i++){
            if(repositories.data[0].private == false){
                filterRepo.push(repositories.data[i])   
            }
        }
        return res.render('index',{user: profile.data, repos: filterRepo,latest: latestSearch[0]})
    }catch(err){
        return res.redirect('/')
    }
    
}
module.exports = {
    getProfile,
    index
}