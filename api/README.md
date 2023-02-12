# nod-api-boilerplate

## Steps used to initialize this project:

- `git clone https://github.com/rayanfalcao8/node-boilerplate.git `
- `cd node-boilerplate`
- `npm update && npm install`
- `npm install -g typescript ts-node`
- Copy the .env.example to .env using command : `cp .env.example .env`
- Install the database following the configurations mentioned in the database.json config file
- For the sequelize execution configure the dev.env.ts file in the `config/lib/db` folder to sequelize all the models in the database

## For the development, we can run a test server by running

npm run dev

## For production

npm run prod

## OpenSSL required
To generate the certificate files needed for https protocol on the API, use the following commands

OpenSSL> req -newkey rsa:2048 -nodes -keyout keytemp.pem -x509 -days 365 -out cert.pem
OpenSSL> rsa -in keytemp.pem -out key.pem
