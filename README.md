# angular-signalstore-example

Angular SignalStore Example

Example of using SignalStore with Angular.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [To Run This App](#to-run-this-app)
- [If You Want to Use the Code](#if-you-want-to-use-the-code)
  - [Click the Star Button and Follow the Author](#click-the-star-button-and-follow-the-author)
- [Date Published](#date-published)
- [Versions Used](#versions-used)
- [About The Author](#about-the-author)
- [What is State Management?](#what-is-state-management)
- [Compare Three Ways to Manage State in Angular](#compare-three-ways-to-manage-state-in-angular)
  - [The SignalStore Version is the Smallest](#the-signalstore-version-is-the-smallest)
- [What is SignalStore?](#what-is-signalstore)
  - [Smaller Components](#smaller-components)
- [What are Angular Signals?](#what-are-angular-signals)
  - [Why is Angular Now Using Signals?](#why-is-angular-now-using-signals)
- [Prerequisites](#prerequisites)
- [Create a New Angular Project](#create-a-new-angular-project)
- [Install NgRx SignalStore](#install-ngrx-signalstore)
- [Install Angular Material](#install-angular-material)
- [Replace Jasmin with Jest](#replace-jasmin-with-jest)
  - [Remove Karma and Jasmine](#remove-karma-and-jasmine)
  - [Add Jest](#add-jest)
  - [Create jest.config.js File](#create-jestconfigjs-file)
  - [Create setup-jest.ts File](#create-setup-jestts-file)
  - [Update test Section in angular.json](#update-test-section-in-angularjson)
  - [Add esModuleInterop to tsconfig.json](#add-esmoduleinterop-to-tsconfigjson)
  - [Update tsconfig.spec.json](#update-tsconfigspecjson)
  - [Update scripts in package.json](#update-scripts-in-packagejson)

## To Run This App

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## If You Want to Use the Code

You can clone the repo and use the code as you see fit. Or you can follow the instructions in this article to create your own project.

In return, Please:

### Click the Star Button and Follow the Author

* Go to the Repository https://github.com/angularexample/mfe-angular-react-nx and click the **Star** button at the top right.
* Go to my GitHub page https://github.com/angularexample and click the **Follow** button on the left side.

This will promote the repo and help others to find this solution.

## Date Published

September 17, 2025

## Versions Used

At the time of this writing, we used the latest version of Angular and NgRX Signals.

* Angular 20.3.3
* @ngrx/signals 20.0.1

This application uses:

* The new folder structure and file name conventions for Angular 20.
* Zoneless change detection.
* Standalone Components.

## About The Author

`JC Lango` is a UI Architect and Developer for many large-scale web applications at several well-known Fortune 500 companies.

He is an expert in **Angular** and **React** and maintains these sites at GitHub:

* **AngularExample** [https://github.com/angularexample](https://github.com/angularexample)
* **ReactJSExample** [https://github.com/reactjsexample](https://github.com/reactjsexample)

JC may be available to work remotely and can be contacted at these links:

* LinkedIn: [https://linkedin.com/in/jclango](https://linkedin.com/in/jclango)
* Email: [jobs@jclango.com](mailto:jobs@jclango.com)

## What is State Management?

State management, in simple terms, is a way to store application data and logic in a centralized service.

The goal of state management is to make your view components much smaller, more reusable, and easier to develop and test.

## Compare Three Ways to Manage State in Angular

I have written three versions of this same example application. This makes it easy to compare the differences between the three versions.

- [Angular NgRx Example](https://github.com/angularexample/angular18-ngrx-standalone)
- [Angular Pure Signals Example](https://github.com/angularexample/angular20-signal-state)
- [Angular SignalStore Example](https://github.com/angularexample/angular-signalstore-example)

All three versions of this example application have identical user experience.

All three versions use the Facade pattern, which helps to decouple the view from the state management logic.

You will see that the view components are small, and almost the same in all three versions.

The only difference is the state management code.

### The SignalStore Version is the Smallest

When you compare the SignalStore version to the other versions, you will see that the SignalStore version is the smallest.

It has the least amount of code.

It is probably the easiest to understand.

## What is SignalStore?

Angular SignalStore is a library that uses Angular Signals to manage state.

It is a package developed by the makers of NgRx.

All the state management logic and data are contained in the SignalStore class.

For more information, see the [NgRx SignalStore documentation](https://ngrx.io/guide/signals/signal-store).


### Smaller Components

Without state management, a typical component does everything from fetching data to displaying it to the user.
It will usually have a lot of logic and a lot of code to get and manipulate data.

When you use state management, you can separate the view from everything else.
You take the data access, the logic, and the state, and put all of that somewhere else.

You are left with a view component that only has to display the data.

View components are much smaller, easier to test, and easier to reuse.

## What are Angular Signals?

Angular Signals is a newer technology introduced with Angular 17.

A signal is data that will be sent to a component. It is similar to a Promise or Observable.

For more information, see the [Angular Signals documentation](https://angular.dev/guide/signals).

### Why is Angular Now Using Signals?

You will see that Angular is now using Signals as a big part of all of its new releases.

One reason is that Signals help to increase performance.

Signals can make your application more responsive.
The view component will only update smaller portions when the data it needs has changed.

For more information, see the official documentation:

* [Angular Signals](https://angular.io/guide/signals)
* [NgRx Signals](https://ngrx.io/guide/signals)

## Prerequisites

You will need the following installed on your computer:

* [Node.js](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/)
* [Git](https://git-scm.com/downloads)

## Create a New Angular Project

Open a terminal window, go to the parent directory of where you want to create the new project directory, and run the following command:

```
 ng new angular-ngrx-signalstore
```

In this case we are creating the project in the `angular-ngrx-signalstore` directory.

When prompted, select the following options:

```
? Which stylesheet format would you like to use?
Sass (SCSS)

? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N) 
N

? Do you want to create a 'zoneless' application without zone.js (Developer Preview)? (y/N) 
y
```

## Install NgRx SignalStore

Install the NgRx Signals package, which also provides the SignalStore.

```
ng add @ngrx/signals@latest
```

For more information, see the [NgRx Signals Install documentation](https://ngrx.io/guide/signals/install).

## Install Angular Material

The example application uses Angular Material for the UI.

Install Angular Material:

```
ng add @angular/material
```


## Replace Jasmin with Jest

### Remove Karma and Jasmine

Remove all the Jasmine and Karma packages from `package.json`.

```
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.9.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
```

### Add Jest

Add the Jest packages to the package.json file.

```
    npm install --save-dev jest @types/jest jest-preset-angular jest-environment-jsdom
```

### Create jest.config.js File

Create a `jest.config.js` file in the root of the project.

```javascript
module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    transform: {
        '^.+\\.ts$': 'ts-jest', // Only transform .ts files
    },
    transformIgnorePatterns: [
        '/node_modules/(?!flat)/', // Exclude modules except 'flat' from transformation
    ],
};
```

### Create setup-jest.ts File

Create a `setup-jest.ts` file in the root of the project.

If not using Zone.js, add the following to the setup-jest.ts file.
```javascript
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv();
```

If using Zone.js, add the following to the setup-jest.ts file.
```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
```

### Update test Section in angular.json

Update the test section in the angular.json file.

```
"test": {
  "builder": "@angular-devkit/build-angular:jest",
  "options": {
    "tsConfig": "tsconfig.spec.json"
  }
}
```

### Add esModuleInterop to tsconfig.json

Add the following to the `tsconfig.json` file under the `compilerOptions` section.

```
"esModuleInterop": true,
```

### Update tsconfig.spec.json

In the `tsconfig.spec.json` file, update the `compilerOptions` section as follows:

```
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
```

### Update scripts in package.json

In the `scripts` section of the `package.json` file, change the `test` property to `jest`.

```
    "test": "jest"
```

