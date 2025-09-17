# angular-signalstore-example

Angular SignalStore Example

Example of using SignalStore with Angular.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## To Run This App

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Compare Three Ways to Manage State in Angular

I have written tree versions of this same example application. This makes it easy to compare the differences between the three versions.

- [Angular NgRx Example](https://github.com/angularexample/angular-ngrx-example)
- [Angular Pure Signals Example](https://github.com/angularexample/angular-pure-signals-example)
- [Angular SignalStore Example](https://github.com/angularexample/angular-signalstore-example)

All three versions of this example application have identical user experience.

All three versions use the Facade pattern, which helps to decouple the view from the state management logic.

You will see that the view components are small, and almost the same in all three versions.

The only difference is the state management code.

### The SignalStore Version is the Smallest

When you compare the SignalStore version to the other versions, you will see that the SignalStore version is the smallest.

It has the least amount of code.

It is probably the easiest to understand.

## Table of Contents

- [About SignalStore](#about-signalstore)
  - [What is State Management?](#what-is-state-management)
    - [Smaller Components](#smaller-components) 
  - [What are Angular Signals?](#what-are-angular-signals)
    - [Why is Angular Now Using Signals?](#why-is-angular-now-using-signals)
  - [What is Angular SignalStore?](#what-is-angular-signalstore)
  - 

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


