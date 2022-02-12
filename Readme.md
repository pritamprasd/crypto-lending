# Crypto Lending Server

## Setup:
### Prerequisites:
1. docker compose

### How to start:
#### Start geth:
```sh
cd geth
docker-compose up -d
```

#### Start geth monitoring (Optional):
- Update `NODE_ENDPOINT`(just update host to your machine local IP) var in docker-compose.yml
```
cd geth-monitoring
docker-compose up -d
```
### Start Server:
```
docker-compose up -d
```

### 
