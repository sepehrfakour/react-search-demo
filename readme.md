#Search Demo

Custom built "instant search" demo renders search results as-you-type. Build using Algolia Search Javascript API client and Algolia Search Helper. ES6/ES2015, React, Webpack front end. No back end.

###Step 1 - Clone:
- Clone repo and `cd` into it.

###Step 2 - Install:
- Run `npm install`.

###Step 3 - Configure:
- For this demo, you will need your Application ID, Admin API Key, and Search API Key [from your account page](https://www.algolia.com/api-keys).
- This demo is currently configured to allow you to set the Application ID and Admin API Key variables in an IIFE which will be run before we execute the import. To do this, create a new file called `env.js` in the `/helpers` directory, add it to your `.gitignore`, and insert the following code:
```
(function () {
  process.env.ALGOLIA_APPLICATION_ID='YOUR_APPLICATION_ID';
  process.env.ALGOLIA_ADMIN_API_KEY='YOUR_ADMIN_API_KEY';
})();
```
- We will use the Application ID and Search API Key in the browser to make requests against your indexed data.
- You must set these inside `client/app.jsx`.

###Step 4 - Import:
- Run `npm run import` to push dataset to algolia index.

###Step 5 - Start Webpack Dev Server:
- Run `npm run dev` to start dev server on `localhost:8080/`.
- Dev server will recompile app.js whenever changes to the files in `/client` are saved
- Resulting app.js bundle will be located at `/assets/js/app.js`.

###Step 6 - Run:
- Run `npm run gd` in another command-line window to compile/watch scss files and open app on localhost:3000

------------------------------------------------------------

#Notes

###Index Name
- You can customize the name of the new Algolia Index created by running the `import.js` script.
- To do so, set the `indexName` variable at the top of `/helpers/import.js`, and in `/client/app.jsx`.

###Deploying
- Before deploying run `npm run gp` to prepare app.js bundle asset path
- Run the `webpack` command at the command line from the project root to run webpack and bundle client JS application. Depending on your deployment and build processes, you may want to configure a build script to do this automatically.

------------------------------------------------------------

#Troubleshooting

###Dev vs Production
- Make sure `app.js` <script> in `/index.html` is loading app from the appropriate path for your environment
- When in dev environment, this <script> path must be `http://localhost:8080/app.js` (set by runnning `npm run gd`)
- When deploying to production, this <script> path must be `assets/js/app.js` (set by runnning `npm run gp`)

###Git
- Code is committed and pushed to origin with asset paths in "production" mode

------------------------------------------------------------

#Optimization

###To optimize React performance, adjust webpack config file for correct environment:
- In dev environment, ensure in webpack.config.js that 'devtools' is set to 'source-map', and that plugins are commented out
- In production environment, ensure in webpack.config.js that 'devtools' is set to 'cheap-module-source-map', and that plugins are uncommented
