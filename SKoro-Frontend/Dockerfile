FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG VITE_ENV_FILE

ENV VITE_ENV_FILE=$VITE_ENV_FILE

RUN echo "$VITE_ENV_FILE" > .env

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
