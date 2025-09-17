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
- [Compare Three Ways to Manage State in Angular](#compare-three-ways-to-manage-state-in-angular)
  - [The SignalStore Version is the Smallest](#the-signalstore-version-is-the-smallest)
- [About SignalStore](#about-signalstore)
  - [What is State Management?](#what-is-state-management)
    - [Smaller Components](#smaller-components)
  - [What are Angular Signals?](#what-are-angular-signals)
    - [Why is Angular Now Using Signals?](#why-is-angular-now-using-signals)
  - [What is Angular SignalStore?](#what-is-angular-signalstore)

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

* Angular 20.2.2
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

## About SignalStore

SignalStore is a library from the makers of NgRx that uses Angular Signals for state management.

### What is State Management?

State management, in simple terms, is a way to store application data and logic in a centralized service.

The goal of state management is to make your view components much smaller, more reusable, and easier to develop and test. 

#### Smaller Components

Without state management, a typical component does everything from fetching data to displaying it to the user.
It will usually have a lot of logic and a lot of code to get and manipulate data.

When you use state management, you can separate the view from everything else.
You take the data access, the logic, and the state, and put all of that somewhere else.

You are left with a view component that only has to display the data.

View components are much smaller, easier to test, and easier to reuse.

### What are Angular Signals?

Angular Signals is a newer technology introduced with Angular 17.

A signal is data that will be sent to a component. It is similar to a Promise or Observable.

For more information, see the [Angular Signals documentation](https://angular.dev/guide/signals).

#### Why is Angular Now Using Signals?

You will see that Angular is now using Signals as a big part of all of its new releases.

One reason is that Signals help to increase performance.

Signals can make your application more responsive.
The view component will only update smaller portions when the data it needs has changed.

### What is Angular SignalStore?

Angular SignalStore is a library that uses Angular Signals to manage state.

It is a package developed by the makers of NgRx.

All the state management logic and data are contained in the SignalStore class.

For more information, see the [NgRx SignalStore documentation](https://ngrx.io/guide/signals/signal-store).


