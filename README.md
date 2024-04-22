curl -F file=@doc/desafio-tecnico/data_1.txt http://localhost:3000/file-upload/upload

docker rm -f $(docker ps -a -q) && docker-compose up --build