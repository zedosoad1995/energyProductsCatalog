FROM node:16-alpine

WORKDIR /usr/src

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci --only=production
COPY --from=0 /usr/src/dist .
COPY --from=0 /usr/src/prisma ./prisma

RUN npm run generate

RUN npm install pm2 -g

ENV CHROME_BIN="/usr/bin/chromium-browser"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

RUN ls -a
RUN pwd

ARG PORT

EXPOSE ${PORT}
#EXPOSE 3000
#CMD ["npx", "prisma", "migrate", "deploy"]
#CMD ["npx", "prisma", "generate"]
CMD ["pm2-runtime","src/server.js"]