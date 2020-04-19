# [FSAE-DA-Web] Fomula Society of Automotive Engineers - Website/Application

# [DOCUMENTATION OUTDATED]

## Description
A cross-platform solution for the visualization of automotive data.

## Available Scripts

In the project directory, you can run the following commands using `npm run <command>`:

    "start": "run-p rstart delayed-estart",
    "estart": "electron .",
    "rstart": "cross-env BROWSER=none react-scripts start",
    "rbuild": "react-scripts build",
    "ebuild": "npm run rbuild && npx electron-packager --overwrite .",
    "delayed-estart": "wait-on http://localhost:3000/ && cross-env BROWSER=none npm run estart",
    "test": "react-scripts test",
    "eject": "react-scripts eject"

### `npm run start`

Runs the react server then the electron app in development mode.<br />
Electron will wait for React's development server ( `http://localhost:3000` ) to load before launching.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page and applcation will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run rstart`

Runs a standalone instance of the React server in development mode.

### `npm run estart`

Runs a standalone instance of the electron app in development mode.
The development server instance of React must be running for the electron application to function.

### `npm run rbuild`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run ebuild`

Produces a production copy of the electron application for the system that is currently in use.

The electron application will use the currently available build of the React application to generate the application. Run `rbuild` to generate the latest iteration of the React application 

### `npm run delayed-estart`

Starts an instance of the Electron application that will wait on a instance of the React server application to load.<br />
Electron will wait for React's development server ( `http://localhost:3000` ) to load before launching.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page and applcation will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# FSAE-DA-WEB-II
