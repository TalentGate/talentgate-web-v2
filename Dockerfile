FROM node:20
LABEL authors="talentgate-web"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
