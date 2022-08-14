ENV_FILE=.env

cd backend
# if no env
if [ ! -f "$ENV_FILE" ]; then
    echo "$ENV_FILE does not exist."
    echo "creating .env"
    cp .env.development $ENV_FILE
fi
# start docker container
echo "Starting container"
docker-compose up --build --force-recreate --no-deps -d
echo "Installing hasura globally"
npm i hasura-cli --location=global
echo "will wait 30 mins before starting console"
sleep 30
cd hasura
hasura migrate apply --envfile ../.env
hasura seed apply --envfile ../.env
hasura metadata apply --envfile ../.env
hasura console --envfile ../.env