cd backend
# start docker container
echo "Starting container"
docker-compose up --build --force-recreate --no-deps -d

if ! [ -x "$(command -v hasura)" ]; then
    echo "hasura-cli could not be found"
    echo 'Error: git is not installed.' >&2
    echo "Installing hasura globally"
    npm i hasura-cli --location=global
fi


pwd
ls
echo "will wait 15 sec before starting console"
sleep 15
cd hasura
pwd
hasura migrate apply --envfile ../.env
hasura seed apply --envfile ../.env
hasura metadata apply --envfile ../.env
hasura console --envfile ../.env