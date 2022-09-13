FROM node:14.15.3


EXPOSE 3000
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
RUN npm cache clean --force

COPY package*.json /app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . /app/

CMD [ "npm", "run", "start" ]