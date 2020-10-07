# Nosedive

## How to run
1. Start the node

- via docker

`docker-compose up node`
- via node

`cd node && npm i && npm start`

The node should start and create a new blockchain. It will display a GCI value, corresponding to an unique identifier of the blockchain.
```
Node started
GCI: 7570607b1cfc5f595605566b005dd98a8e9447425bb3913b32f49c9f496600c2
```

2. Start the frontend

Copy you **GCI** into frontend/.env file:
```
GCI=7570607b1cfc5f595605566b005dd98a8e9447425bb3913b32f49c9f496600c2
```

