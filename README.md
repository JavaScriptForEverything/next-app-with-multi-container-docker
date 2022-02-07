# How to deploy Nextjs + database app with docker multi-container

### Deployment React App With Docker


###### NPM packages used

$ yarn add next react react-dom
		@mui/material @mui/icons-material @emotion/react @emotion/styled
		@axios next-connect next-absolute-url
		mongoose


###### Directory Stracture

```
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
│
├── pages
│ ├── addUser.js
│ ├── api
│ │ └── users
│ │     ├── [id].js
│ │     └── index.js
│ │
│ ├── index.js
│ └── viewUser.js
│
├── server
│ ├── controllers
│ │ └── userController.js
│ │
│ └── models
│     ├── database.js
│     └── userModel.js
│
├── README.md
├── .gitignore
├── package.json
└── yarn.lock
```


###### /Dockerfile

	FROM node:16.13.2-alpine3.15
	WORKDIR /app
	COPY package.json yarn.lock ./
	RUN yarn install
	COPY . .
	EXPOSE 3000
	CMD ["yarn", "dev"]


###### /docker-compose.yml  (use space, instead of tab)

	version: "3"
	volumes:
	  docker:

	services:
	  database:
	    image: mongo
	    ports:
	      - 27017:27017
	    volumes:
	      - docker:/data/db

	  next:
	    build: .
	    ports:
	      - 3000:3000
	    volumes:
	      - .:/app
	    environment:
	      DB_LOCAL_URL: mongodb://database:27017/next-docker
	    depends_on:
	      - database



###### Building image & Container

	$ docker-compose build 		(1) 	: Build multi-container image
	$ docker image ls 			: projectDirectoryName-imageName
	$ docker-compose up -d 		(2)	: Start multi-container
	$ docker-compose logs -f  		: See all (both) container's logs together
	$ docker logs -f next-app_next 		: See only 'next-app_next' container's logs

	$ docker-compose ps -a 			: show process/containers running by docker-compose
	$ docker ps -a 				: show all process
	$ docker down 				: stop multi-container

	NB: - Though database take some times to start & ready, so 1st time may require refresh browser
		. To solve that issue we can use a package 'wait-for-it'


###### Test app on browser

(Browser) http://localhost:3000 		: We EXPOSEed & bind port 3000 + Production


