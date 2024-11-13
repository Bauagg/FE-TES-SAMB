#### FE-TES-SAMB
This project is a React-based frontend application designed to interact with a backend server. Follow the instructions below to clone, set up, run, and build the project

## Table of Contents
-Getting Started
- Installation
- Environment Variables
- Running the Project
- Building the Project
- Contributing
- License

### Getting Started
## Prerequisites
Before you start, ensure you have the following installed:
- Node.js (version 18 or above)
- npm (version 6 or above)

## Installation
1. Clone the repository
     git clone https://github.com/Bauagg/FE-TES-SAMB.git
2. Navigate to the project directory
     cd FE-TES-SAMB
3. Install dependencies
     npm install

## Environment Variables
Create a .env file in the root of the project to set up environment variables. This application requires an API URL to connect to the backend.

In your .env file, add:
  REACT_APP_API_URL=http://localhost:8080

Replace http://localhost:8080 with the URL of your backend server if it is hosted elsewhere.

## Running the Project
To run the application in development mode, use:
  npm start

This will start the development server, and you can view the application at http://localhost:3000.

# Hot-Reloading
Any changes you make to the source code will automatically reload the page.

## Building the Project
To create an optimized production build, use:
  npm run build

This will generate a build directory with all the production-ready assets.

## Folder Structure
- src/: Contains all the application source code, including components, assets, and styles.
- public/: Contains static assets and the HTML template.
  
## Contributing
If you'd like to contribute to this project, please fork the repository and create a new branch for your feature or bug fix. Once you're done, submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License.
