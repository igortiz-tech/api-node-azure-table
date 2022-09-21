const http = require('http')
const Hero = require('./entities/hero')
const Factory = require('./factories/heroFactory')
const heroServices = Factory.generateInstance()
const PORT = 300
const DEFAULT_HEADER = {'Content-Type': 'application/json'}


const routes = {
    '/heroes:get': async (request, response) => {
        // await Promise.reject('/heroes:get')
        const { id } = request.queryString
        const heroes = await heroServices.find(id)
        response.write(JSON.stringify({results: heroes}))
        return response.end()
    },
    '/heroes:post': async (request, response ) => {
        try {
            for await (const data of request) {
                const item = JSON.parse(data)
                const hero = new Hero(item)
                const { error, valid } = hero.isValid()
                
                if(!valid){
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({error: error.join(',')}))
                    return response.end()
                }

                const id = await heroServices.create(hero)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({ success: 'User Created with success!!!', id}))

                // objeto por requisicao
                return response.end()
            }
        } catch (error) {
            return handlerError(response)(error)
        }
    },
    default: (request, response) => {
        response.write('Azure!!')
        response.end()
    }

}

const handlerError = response => {
    return error => {
        console.log('deu ruim')
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: 'Internal Server Error' }))
        return response.end()
    }
}

const handler = (request, response) => {
    const { url, method } = request
    const [first, route, id] = url.split('/')
    request.queryString = { id: isNaN(id)? id : Number(id)}
    const key = `/${route}:${method.toLowerCase()}`
    
    response.writeHead(200, DEFAULT_HEADER) 
    const chosen = routes[key] || routes.default 
    return chosen(request, response)
            .catch(handlerError(response))
}

http.createServer(handler)
    .listen(PORT, () => console.log('server running at', PORT))