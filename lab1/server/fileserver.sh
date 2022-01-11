sudo docker network create my_network

sudo docker build -t my_server_image .

sudo docker volume create servervol

sudo docker rm server

export PORT=8080

sudo docker run --name server -v servervol:/serverdata -e PORT=$PORT --network my_network my_server_image