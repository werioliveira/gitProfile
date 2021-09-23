const api = require('../utils/api')
const {db, getLatest} = require('../utils/db')
async function index(req,res){
    var latestSearch = []
    let result = await getLatest()
    latestSearch.push(result)
    return res.render('index',{latest: latestSearch[0]})
}
async function getProfile(req,res){
    const user = 'users'+'/'+req.body.user
    const repos = 'users'+'/'+req.body.user+'/repos'
    db.run(`INSERT INTO latestSearch(search) VALUES(?)`, req.body.user, function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
    try{
        const profile = await api.get(user)
        const repositories = await api.get(repos+'?sort=created&direction=desc')
        const filterRepo = []
        
        for(i =0; i< 3;i++){
            if(repositories.data[0].private == false){
                filterRepo.push(repositories.data[i])   
            }
        }
        return res.render('profile',{user: profile.data, repos: filterRepo})
    }catch(err){
        return res.redirect('/')
    }
    
}
module.exports = {
    getProfile,
    index
}