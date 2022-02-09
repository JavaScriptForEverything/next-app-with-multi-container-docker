FROM node:16.13.2-alpine3.15
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENV DB_LOCAL_URL=mongodb://localhost:27017/next-docker
EXPOSE 3000
RUN yarn build
# CMD ["yarn", "dev"]
CMD ["yarn", "start"]

