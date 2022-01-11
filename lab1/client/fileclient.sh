sudo docker build -t my_client_image .

sudo docker volume create clientvol

CONTAINER_IP=$(sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' server)

sudo docker rm client

SERVER_PORT=8080

sudo docker run --name client -v clientvol:/clientdata -e IP=$CONTAINER_IP -e SERVER_PORT=$SERVER_PORT --network my_network my_client_image