# NuThoughts Server

Express.JS server that creates atomic markdown notes

## Installation

Install Node.JS

- https://nodejs.org/en/download

Once installed, globally install yarn

- `npm install -g yarn`

Now install all dependencies

- `yarn install`

Create an .env file based on the .env.example

- `cp .env.example .env`

Now add a value to each variable in the environment file

## Usage

### Development

- `yarn run dev`

### Production

Build a docker image

```bash
docker build -t nuthoughts-server
```

Run the image as a container

```bash

docker run -p <host-port>:<container-port> --restarts on-failure --name nuthoughts-server -d nuthoughts-server
```

### Test

- `yarn run test`
