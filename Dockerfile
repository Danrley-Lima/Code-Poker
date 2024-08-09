FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Run the NestJS application
CMD ["npm", "run", "start:dev"]
