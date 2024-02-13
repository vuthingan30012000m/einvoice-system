<!-- Code -->

<!-- Mes1 -->
<!-- 2 -->






mes
common
test


<!--  -->

version: "3.4"

services:
  zookeeper:
    image: bitnami/zookeeper
    restart: always
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: bitnami/kafka
    ports:
      - "9092:9092"
    restart: always
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_LISTENERS=PLAINTEXT://:9092
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local
   
networks:
  default:
    external:
      name: mydockernetwork

<!--  -->

version: '3.7'

services:

  user-cmd-api:
    container_name: user-cmd-api
    image: user-cmd-api:latest
    restart: always
    ports:
      - 8081:8081
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  user-query-api:
    container_name: user-query-api
    image: user-query-api:latest
    restart: always
    ports:
      - 8082:8082
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  bankacc-cmd-api:
    container_name: bankacc-cmd-api
    image: bankacc-cmd-api:latest
    restart: always
    ports:
      - 9091:9091
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  bankacc-query-api:
    container_name: bankacc-query-api
    image: bankacc-query-api:latest
    restart: always
    ports:
      - 9092:9092
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  api-gateway:
    container_name: api-gateway
    image: api-gateway:latest
    restart: always
    ports:
      - 2000:2000
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
networks:
  default:
    external:
      name: springbankNet
<!--  -->

networks:
  default:
    external:
      name: springbankNet

<!-- ?? -->


version: '3.7'

services:

  user-cmd-api:
    container_name: user-cmd-api
    image: user-cmd-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 8081
        published: 8081
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  user-query-api:
    container_name: user-query-api
    image: user-query-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 8082
        published: 8082
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  bankacc-cmd-api:
    container_name: bankacc-cmd-api
    image: bankacc-cmd-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 9091
        published: 9091
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  bankacc-query-api:
    container_name: bankacc-query-api
    image: bankacc-query-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 9092
        published: 9092
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  api-gateway:
    container_name: api-gateway
    image: api-gateway:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 2000
        published: 2000
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
networks:
  default:
    external:
      name: springbankNet
<!--  -->



  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    restart: always
<!-- version: '3.7' -->
version: "3.8"

services:
  mysql:
    image: mysql:8.0.23
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    ports:
      - 3306:3306

  postgres:
    image: postgres:13.1
    restart: always
    environment:
      POSTGRES_PASSWORD: example
    ports:
      - 5432:5432

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
<!--  -->
version: '3.7'

services:

  user-cmd-api:
    container_name: user-cmd-api
    image: user-cmd-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 8081
        published: 8081
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  user-query-api:
    container_name: user-query-api
    image: user-query-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 8082
        published: 8082
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  bankacc-cmd-api:
    container_name: bankacc-cmd-api
    image: bankacc-cmd-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 9091
        published: 9091
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  bankacc-query-api:
    container_name: bankacc-query-api
    image: bankacc-query-api:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 9092
        published: 9092
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
  api-gateway:
    container_name: api-gateway
    image: api-gateway:latest
    deploy:
      replicas: 1
    restart: always
    ports:
      - target: 2000
        published: 2000
        protocol: tcp
        mode: host
    environment:
      - "SPRING_PROFILES_ACTIVE=docker"
      
networks:
  default:
    external:
      name: springbankNet
<!--  -->
services:
  api_gateway:
    build: ./http-api-gateway
    ports:
      - "3000:3000"
    volumes:
      - ./http-api-gateway/src:/usr/src/app/src
      - /usr/src/app/node_modules
    command: npm run start:dev
    environment:
      - PORT=3000





  users_microservice:
    build: ./users-microservice
    volumes:
      - ./users-microservice/src:/usr/src/app/src
      - /usr/src/app/node_modules
    command: npm run start:dev






  payments_microservice:
    build: ./payments-microservice
    volumes:
      - ./payments-microservice/src:/usr/src/app/src
      - /usr/src/app/node_modules
    command: npm run start:dev




    
  nats:
    image: nats
    ports:
      - 4222:4222
  mysql_db:
    image: mysql
    ports:
      - "3307:3307"
    environment:
      - MYSQL_ROOT_PASSWORD=root_password_123
      - MYSQL_DATABASE=nestjs_db
      - MYSQL_USER=testuser
      - MYSQL_PASSWORD=testuser123
      - MYSQL_TCP_PORT=3307
<!--  -->


version: "3.4"

services:
  zookeeper:
    image: bitnami/zookeeper
    restart: always
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: bitnami/kafka
    ports:
      - "9092:9092"
    restart: always
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_LISTENERS=PLAINTEXT://:9092
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local
