FROM nginx:1.21.6-alpine

RUN rm /etc/nginx/conf.d/*
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
