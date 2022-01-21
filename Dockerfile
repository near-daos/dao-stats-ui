FROM node:14.16.0-alpine AS deps
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:14.16.0-alpine AS build
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build

# production environment
FROM nginx:stable-alpine AS runner

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY .env.docker /usr/share/nginx/html/.env

WORKDIR /usr/share/nginx/html

EXPOSE 3000

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
