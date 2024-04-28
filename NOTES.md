curl -F file=@doc/desafio-tecnico/data_1.txt http://localhost:3000/file-upload/upload

docker rm -f $(docker ps -a -q) && docker-compose up --build



delete from "product" ;
delete from "order" ;
delete from "user" ; 



curl --request POST \
  --url http://localhost:3000/file-upload/upload \
  --header 'content-type: multipart/form-data' \
  --form file=@/mnt/arquivos/trabalho/magalu/magalu-test/doc/desafio-tecnico/data_1_test.txt


     nest g co order



     select u."externalId" as userExternalId, u."name", o."externalId" as orderExternalId , o."orderDate" , p."externalId"  as productExternalId, p.value 
from "user" u
inner join "order" o on o."userId"  = u.id 
inner join product p on p."orderId"  = o.id
where o.id = '69620eb7-6733-4e23-936e-fa4614074635'; 






CURLS:
curl --request POST \
  --url http://localhost:3000/file-upload/upload \
  --header 'content-type: multipart/form-data' \
  --form file=@/mnt/arquivos/trabalho/magalu/magalu-test/doc/desafio-tecnico/data_1_test.txt

  curl --request GET \
  --url 'http://localhost:3000/order/08038229-ffe4-4439-8a5a-b6a719a5f855?=' \
  --header 'User-Agent: insomnia/9.0.0'

curl --request GET \
  --url 'http://localhost:3000/order?startDate=2021-09-10&endDate=2021-10-10' \
  --header 'User-Agent: insomnia/9.0.0'