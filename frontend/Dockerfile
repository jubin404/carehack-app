FROM node:20-alpine

WORKDIR /frontend

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose development port
EXPOSE 3000

# Set development environment
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run in development mode with hot reloading
CMD ["npm", "run", "dev"]