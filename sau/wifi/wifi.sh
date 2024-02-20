#!/bin/bash
echo "Tải offline"

echo "Tải mysql"
# docker pull mysql
# docker save -o wifi/image/mysql_image.tar mysql
docker load -i wifi/image/mysql_image.tar
echo "Xong mysql"

echo "Tải node"
# docker pull node
# docker save -o wifi/image/node_image.tar node
docker load -i wifi/image/node_image.tar
echo "Xong node"

echo "Tải nats"
# docker pull nats
# docker save -o wifi/image/nats_image.tar nats
docker load -i wifi/image/nats_image.tar
echo "Xong nats"

echo "Tải mailhog"
# docker pull  mailhog/mailhog
# docker save -o wifi/image/mailhog_image.tar mailhog/mailhog
docker load -i wifi/image/mailhog_image.tar
echo "Xong mailhog"

echo "Tải phpmyadmin"
# docker pull  phpmyadmin/phpmyadmin
# docker save -o wifi/image/phpmyadmin_image.tar phpmyadmin/phpmyadmin
docker load -i wifi/image/phpmyadmin_image.tar
echo "Xong phpmyadmin"