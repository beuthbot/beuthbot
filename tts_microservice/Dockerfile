FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Install Sox for converting different audio formats to WAV
RUN apt-get update && apt-get install sox -y

# Bundle app source
COPY . .

CMD [ "npm", "start" ]