# JobSpotter

> Find, compare, and analyze new jobs

## Team

  - __Product Owner__: Paul Sokolik
  - __Scrum Master__: Timmy Luong
  - __Development Team Members__: Ashwin Aravindan, Chris Staton

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Install dependencies

> Start MySQL server

> Run gulp
```sh
gulp
```

## Requirements

- backbone: 1.2.1
- bcrypt-nodejs: 0.0.3
- bluebird: 2.9.30
- body-parser: 1.13.1
- bookshelf: 0.8.1
- chai: 1.9.0
- cookie-parser: 1.3.5
- cron: 1.0.9
- d3-browserify: 3.4.12
- express: 4.12.4
- express-method-override: 0.0.3
- express-session: 1.11.3
- indeed-api: 1.0.0
- jquery: 2.1.4
- jquery-ui-browserify: 1.11.0-pre-seelio
- knex: 0.8.6
- mocha: 1.17.1
- morgan: 1.6.0
- mysql: 2.7.0
- node: 0.0.0
- passport: 0.2.2
- passport-linkedin-oauth2: 1.2.1
- passport-local: 1.0.0
- react: 0.13.3
- react-d3: 0.3.1
- request: 2.58.0
- underscore: 1.8.3

## Development


### Installing Dependencies

From the root directory:

```sh
npm install -g bower
npm install
bower install
mysql.server start
```

### Deployment

Heroku:
> (Optional) For better performance, add a Google Maps API key in client/index.html by replacing "sensor=true"
> (Optional) Use a local file for Google Maps Utility Marker Clusterer rather than the default svn
> Remove dist/ folder from .gitignore
> Run gulp to update dist/src/build.js
> (Recommended) Install a utility that minifies JavaScript files
```sh
npm install -g uglifyjs
```
> (Recommended) Minify dist/src/build.js
> (Recommended) Rename the minified file as build.js (this fill will be included in index.html)

> From the root directory, make a commit from your master branch, then push to Heroku (may require force push)
```sh
git add *
git commit
git push --force heroku master
```
> After Heroku confirms deployment, reset the temporary changes by resetting the HEAD of your master branch
```sh
git reset HEAD~1
git checkout -- .
```

> To manage your app log in to the Heroku Dev Center

> For a tutorial on deployment read https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

### Database
ClearDB MySql 

> Only needs to be set up once when you deploy the first time to Heroku

> Set up your database initially
```sh
heroku addons:create cleardb
```

### Roadmap


View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
