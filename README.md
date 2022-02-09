# How to deploy Nextjs (+mongoose) app with Nginx by docker


###### NPM packages used

`
$ yarn add next react react-dom
`

```
	@mui/material @mui/icons-material @emotion/react @emotion/styled
	mongoose next-connect next-absolute-url
	axios
```


###### Directory Stracture

```
├── docker-compose.yml 					: (4)
├── Dockerfile 						: (1)
├── .dockerignore
├── nginx
│ ├── default.conf 					: (2)
│ └── Dockerfile 					: (3)
│
├── pages
│ ├── api
│ │ └── users
│ │     ├── [id].js
│ │     └── index.js
│ │
│ ├── index.js
│ ├── addUser.js
│ └── viewUser.js
│
├── public
│ └── favicon.ico
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
	ENV DB_LOCAL_URL=mongodb://localhost:27017/next-docker 	: will be override in compose file
	EXPOSE 3000
	RUN yarn build
	# CMD ["yarn", "dev"] 					: use as development purpose
	CMD ["yarn", "start"] 					: used when try to deploy

###### /nginx/Dockerfile

	FROM nginx:1.21.6-alpine
	RUN rm /etc/nginx/conf.d/*
	COPY ./default.conf /etc/nginx/conf.d/ 			: The nginx config
	EXPOSE 80
	CMD [ "nginx", "-g", "daemon off;" ]


###### /nginx/default.conf

- NB: config used based on name 'nextjs', to use other name change default.conf according to this
- Details found on: https://steveholgado.com/nginx-for-nextjs/


```
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC:10m inactive=7d use_temp_path=off;

upstream nextjs_upstream {
  server nextjs:3000;
}

server {
  listen 80 default_server;

  server_name _;

  server_tokens off;

  gzip on;
  gzip_proxied any;
  gzip_comp_level 4;
  gzip_types text/css application/javascript image/svg+xml;

  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;

  location /_next/static {
    proxy_cache STATIC;
    proxy_pass http://nextjs_upstream;

    # For testing cache - remove before deploying to production
    add_header X-Cache-Status $upstream_cache_status;
  }

  location /static {
    proxy_cache STATIC;
    proxy_ignore_headers Cache-Control;
    proxy_cache_valid 60m;
    proxy_pass http://nextjs_upstream;

    # For testing cache - remove before deploying to production
    add_header X-Cache-Status $upstream_cache_status;
  }

  location / {
    proxy_pass http://nextjs_upstream;
  }
}
```



###### /docker-compose.yml  (use space, instead of tab)

```
	version: "3"

	volumes:
	  data:

	services:
	  database:
	    image: mongo:4.0-xenial
	    ports:
	      - 27017:27017
	    volumes:
	      - data:/data/db

	  nextjs: 						: this name used in 'default.conf'
	    build: .
	    volumes:
	      - .:/app 						: just for development purpose
	    environment:
	      DB_LOCAL_URL: mongodb://database:27017/next-docker
	    depends_on:
	      - database

	  nginx:
	    build: ./nginx
	    ports:
	      - 80:80
```



###### Building image & Container

	$ docker-compose build 		(1) 	: Build multi-container image
	$ docker image ls 			: projectDirectoryName-imageName
	$ docker-compose up -d 		(2)	: Start multi-container
	$ docker-compose logs -f  		: See all (both) container's logs together
	$ docker logs -f next-app_nextjs 	: See only 'next-app_next' container's logs

	$ docker-compose ps -a 			: show process/containers running by docker-compose
	$ docker ps -a 				: show all process
	$ docker down 				: stop multi-container

	NB: - Though database take some times to start & ready, so 1st time may require refresh browser
		. To solve that issue we can use a package 'wait-for-it'


###### Test app on browser

(Browser) http://localhost:80 			: We EXPOSEed & bind port 80 + Production
(Browser) http://localhost


