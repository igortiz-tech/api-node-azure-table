echo -e '\n\n requesting all herores'
curl localhost:300/heroes

echo -e '\n\n requesting flahs'
curl localhost:300/heroes/1

echo -e '\n\n requesting with wrong values'
curl --silent -X POST \
    --data-binary '{"invalid": "Batman"}' \
    localhost:300/heroes


echo -e '\n\n creating batman'
CREATE=$(curl --silent -X POST \
    --data-binary '{"name": "Batman","age": 200,"power": "Rich"}' \
    localhost:3000/heroes)    

echo $CREATE
