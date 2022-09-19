// regras de negocios
class HeroService {
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository
    } 

    async find(itemId){
        return this.heroRepository.find(itemId);
    }


    async create(data){
        return this.heroRepository.create(data);
    }
}

module.export = HeroService