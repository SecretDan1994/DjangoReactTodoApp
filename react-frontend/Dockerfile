# react-frontend/Dockerfile

FROM node:16

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
