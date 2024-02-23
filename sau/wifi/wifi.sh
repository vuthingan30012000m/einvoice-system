#!/bin/bash
echo "Tải offline"

echo "Tải mysql"
# docker pull mysql
# docker save -o sau/wifi/image/mysql_image.tar mysql
docker load -i sau/wifi/image/mysql_image.tar
echo "Xong mysql"

echo "Tải node"
# docker pull node
# docker save -o sau/wifi/image/node_image.tar node
docker load -i sau/wifi/image/node_image.tar
echo "Xong node"

echo "Tải nats"
# docker pull nats
# docker save -o sau/wifi/image/nats_image.tar nats
docker load -i sau/wifi/image/nats_image.tar
echo "Xong nats"

echo "Tải mailhog"
# docker pull  mailhog/mailhog
# docker save -o sau/wifi/image/mailhog_image.tar mailhog/mailhog
docker load -i sau/wifi/image/mailhog_image.tar
echo "Xong mailhog"

echo "Tải phpmyadmin"
# docker pull  phpmyadmin/phpmyadmin
# docker save -o sau/wifi/image/phpmyadmin_image.tar phpmyadmin/phpmyadmin
docker load -i sau/wifi/image/phpmyadmin_image.tar
echo "Xong phpmyadmin"

# echo "Tải postgres:alpine"
# docker pull postgres:alpine
# docker save -o sau/wifi/image/postgres_image.tar postgres:alpine
# docker load -i sau/wifi/image/postgres_image.tar
# echo "Xong postgres"

# echo "Tải pgadmin4"
# docker pull dpage/pgadmin4
# docker save -o sau/wifi/image/pgadmin4_image.tar dpage/pgadmin4
# docker load -i sau/wifi/image/pgadmin4_image.tar
# echo "Xong pgadmin4"


# echo "Tải latex"
# docker pull         blang/latex:latest
# docker save -o sau/wifi/image/latex_image.tar  blang/latex:latest
# docker load -i sau/wifi/image/latex_image.tar
# echo "Xong latex"



