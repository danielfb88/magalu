curl -F file=@doc/desafio-tecnico/data_1.txt http://localhost:3000/file-upload/upload

docker rm -f $(docker ps -a -q) && docker-compose up --build



delete from "product" ;
delete from "order" ;
delete from "user" ; 



curl --request POST \
  --url http://localhost:3000/file-upload/upload \
  --header 'content-type: multipart/form-data' \
  --form file=@/mnt/arquivos/trabalho/magalu/magalu-test/doc/desafio-tecnico/data_1_test.txt


  TODO: DATE IS WRONG - 26/04/24

  /* 
    TODO
    4 - endpoints com filtros
    5 - testes
    6 - readme
     */

     nest g co order