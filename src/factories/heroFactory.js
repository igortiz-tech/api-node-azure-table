const { join } = require('path')
const file = join(__dirname,'../', '../database', 'data.json')


const HeroRepository = require('../repositories/heroRepository')
const HeroService = require('../services/heroService')


const generateInstance = () => {
    const heroRepository = new HeroRepository({file})
    const heroServices = new HeroService({heroRepository})
    return heroServices;
}


module.exports = { generateInstance }

// generateInstance().find().then(console.log)