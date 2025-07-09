#!/bin/bash

# Ensure proper logging and group permissions
sudo yum update -y
sudo yum install -y docker
sudo yum install -y htop

# Start Docker with explicit logging
sudo systemctl start docker || echo "docker start didn't work"
sudo systemctl enable docker || echo "docker enable didn't work"

# Add user and ensure group membership
sudo usermod -aG docker ec2-user
sudo systemctl restart docker

# Inform user about logout requirement
echo "Please log out and back in for group changes to take effect."
echo "Alternatively, use 'sudo' for Docker commands in this session."

# Test Docker commands with sudo (optional)
sudo docker version
sudo docker run hello-world || echo "Docker run failed"

# Verbose Curl download for Docker Compose
sudo curl -v -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
