FROM node:18-alpine AS base

WORKDIR /cashmanapp

# Install dependencies based on the preferred package manager
COPY package*.json .
  
COPY . .
 
RUN npm install

RUN npm run build

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "run", "start"]