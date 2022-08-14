# Development


> Note: Rename .env.development to .env

#### Hasura
Start containers and go to localhost:9695

#### Server
Start containers and use localhost:3000. Changes in the server folder are automatically mapped to the port with nodemon
> Note: you will need to rebuild if you install a new package
> Note: uses the same .env file from the root


## Docker Commands

### Containers
#### Starting the containers with build
```sh
sudo docker-compose up --build --force-recreate --no-deps
```
> Note: add `-d` to run in detached mode


#### Starting the containers without build
```sh
sudo docker-compose up -d
```

#### List active containers
```sh
sudo docker ps
```

#### List all containers
```sh
sudo docker ps -a
```

#### Remove a container
```sh
docker rm ID_or_Name
```

#### Stop all containers
```sh
sudo docker stop $(sudo docker ps -a -q)
```

#### Remove all containers
```sh
sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q) && sudo docker volume prune
```

#### If unable to stop container
```sh
killall Docker && open /Applications/Docker.app
```
and
```sh
docker-compose down
```


### Images
#### List all images
```sh
sudo docker images -a
```

#### Remove one image
```sh
sudo docker rmi IMAGENAME
```

#### Remove all images
```sh
sudo docker rmi $(sudo docker images -a -q)
```

### Volumes
#### Create volume
```sh
docker volume create db_data
```
#### List all volumes
```sh
sudo docker volume ls
```

#### List dangling volume
```sh
sudo docker volume ls -f dangling=true
sudo docker volume prune
``` 

#### Remove volume
```sh
sudo docker volume rm volume_name
```

## Local Postgres Setup
add following lines under Allow replication connections from localhost, to etc/postgresql/<>postgres_version<>/main/pg_hba.conf
```sh
host    all             all             0.0.0.0/0               md5
host    all             all             ::/0                    md5
```


Edit following line under CONNECTIONS AND AUTHENTICATION to to etc/postgresql/<>postgres_version<>/main/postgresql.conf
```sh
local_addresses = '*'
```