# Chart Comments

+ Chart Comments is a simple example of a web application that 
  displays a chart that users can comment on.

+ This project is intended to be used as a starting point for building 
  a more complex application.

+ As a bonus, the code can be used as a template for building any other 
  React + FastAPI web application.

## How to run the project?

+ Start both Front End and Back End apps (see the instructions below).

+ Open your browser and go to http://localhost:3000.

+ Voilà! Now you can enjoy the app.

### Front End

+ Front End is managed via `yarn`.

+ To start the Front End app:

  ```shell
  cd frontend
  yarn install
  yarn start
  ```

+ Run `yarn lint` to lint the Front End codebase.

### Back End

+ Back End is managed via [tusk](https://github.com/rliebz/tusk).

  + [tusk installation instructions](https://github.com/rliebz/tusk#installation)

+ To start the Back End app:

    ```shell
    cd backend
    python -m venv
    source venv/bin/active
    tusk dependencies:sync-dev
    tusk app:run-dev
    ```
+ Run `tusk linters:run-all` to lint the Back End codebase.

+ Run `tusk tests:run` to run the Back End tests.

## Project Requirements

+ [x] Choose a single chart type you would like to work with.
  + Chosen chart type: bar chart

+ [x] Display the chart on the frontend using a library of your choice.
  + Chosen chart library: [d3](https://github.com/d3/d3)

+ [x] When you click on a data point, show a comments menu.

+ [x] Show comments count on each data point when no data is selected.

+ [x] The comment add form should have username and comment fields.

## Project Technical Constraints & Guidelines

+ [x] Python + FastAPI for the backend.

+ [x] React/Typescript + your choice data store for frontend.
  + Chosen data store: [Redux](https://redux.js.org)

+ [x] Take a minimal approach to the task, no need to use DB/authentication, 
  error reporting, Docker, etc.

+ [x] Use static mock for the chart data on the backend.

+ [x] We expect you to use TDD for core backend logic and structure commits as 
  if you were working on a real+life project.

+ [x] Use your own judgement to define a scope of a Minimal Lovable Product.

+ [x] Prepare to discuss scalability design during the technical interview 
  calls.
