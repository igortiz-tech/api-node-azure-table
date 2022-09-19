const { join } = require('path')
const file = join(__dirname,'../', '../database', 'data.json')


const HeroRepository = require('../repositories/heroRepository')
const HeroService = require('../services/heroServices')


const generateInstance = () => {
    const heroRepository = new HeroRepository({file})
    const heroServices = HeroService({heroRepository})
    return heroServices;
}


module.export = { generateInstance }