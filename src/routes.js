const {Router} = require('express')
const Index = require('./controller/index')
const routes = Router()



routes.get('/',Index.index)
routes.post('/',Index.getProfile)

module.exports = routes