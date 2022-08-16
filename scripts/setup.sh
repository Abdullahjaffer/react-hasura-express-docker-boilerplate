ENV_FILE=.env

cd backend
# if no env
if [ ! -f "$ENV_FILE" ]; then
    echo "$ENV_FILE does not exist."
    echo "creating .env"
    cp .env.development $ENV_FILE
fi
echo "Installing server packages"
cd server
yarn
cd ../../frontend
yarn