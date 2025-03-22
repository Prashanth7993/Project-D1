FROM nginx:alpine
WORKDIR /usr/src/app
RUN npm run build
COPY Frontend-ReactJs/event-management-dashboard/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]