FROM node:20-alpine
 
#Create app folder in Container root directory
WORKDIR /app
 
#Copy files to container app directory
COPY . /app
 
#Install npm dependencies
RUN npm install
 
#This command will be executed at the start of container
CMD [ "npm", "run", "dev" ]