# CVE-knight

## Introduction
This project is a Node.js web application that demonstrates the basic setup and containerization of a Node.js application using Docker and Docker Compose. It includes a simple server that responds to requests with static content and demonstrates how to containerize your application for development and production environments.

## Features
- Node.js web server
- Dockerfile for containerization
- Docker Compose for easy development setup
- Live code reloading in development

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Docker and Docker Compose are installed on your machine.
- Node.js is installed on your machine (for local development without Docker).

## Getting Started

### Clone the Repository
First, clone this repository to your local machine:
```bash	
git clone https://yourrepositoryurl.git
cd your-project-directory
````

### Running with Docker Compose

#### Development
To start the application in development mode with Docker Compose, run:
```bash	
docker-compose up --build
````	

This command builds the Docker image (if necessary) and starts the container. The application will be accessible at `http://localhost:49160`.

To stop the application, use:
```bash	
docker-compose down
````
#### Production
For production, you might want to change the `NODE_ENV` environment variable to `production` in the `docker-compose.yml` file or within your Dockerfile.

### Running Locally Without Docker
If you prefer to run the application locally for quick testing or development, follow these steps:

1. Install the dependencies:
````bash	
npm install
````

2. Start the application:
````bash
node app.js
````

The application will start and be accessible at `http://localhost:3000`.

## Contributing
We welcome contributions to this project! Please consider the following ways to contribute:
- Submitting bug reports and feature requests
- Creating pull requests for bug fixes and new features

## License
This project is licensed under the [MIT License](LICENSE.md). See the LICENSE file f