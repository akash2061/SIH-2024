# Use the latest Arch Linux image
FROM archlinux:latest

# Install Node.js and npm
RUN pacman -Syu --noconfirm nodejs npm

# Create app directory
WORKDIR /usr/src/app

# Copy application code
COPY . .

# Install app dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["node", "script.js"]