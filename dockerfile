# Use a lightweight nginx image
FROM nginx:alpine

# Copy your static files into the nginx default html directory
COPY . /usr/share/nginx/html

# Optional, EXPOSE is just documentation — doesn't affect runtime
EXPOSE 80