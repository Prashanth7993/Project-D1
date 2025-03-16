FROM nginx:alpine
WORKDIR /usr/src/app
RUN npm run build
COPY build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]