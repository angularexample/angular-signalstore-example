import { catchError, of } from 'rxjs';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { Router } from '@angular/router';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';
import { XxxUserApiResponse, xxxUserInitialState, XxxUserState, XxxUserType } from './xxx-user-types';
import { XxxUserData } from './xxx-user-data'

/**
 * XxxUserStore is the feature state for the user page.
 * State management for Angular using NgRx SignalStore.
 * Where we store all the properties needed to support the view.
 * It can be local scope to a component or global scope to the app.
 * Adding root provider makes it global scope to the app.
 * The signalStore method is a factory function that returns a store class object
 */
export const XxxUserStore = signalStore(
  {providedIn: 'root'},

  // In withState, we define the initial state of the store.
  // All properties must be present in the initial state.
  withState<XxxUserState>(xxxUserInitialState),

  // In withProps, we define the properties needed to support the view.
  // It is similar to where we inject the services in the construction phase of a class.
  withProps(() => ({
      alertService: inject(XxxAlert),
      loadingService: inject(XxxLoadingService),
      router: inject(Router),
      userData: inject(XxxUserData)
    })
  ),

  // In withComputed, we define the computed properties needed to support the view.
  // Computed properties are properties that are derived from other properties.
  // They cannot have a parameter.
  withComputed((store) => ({
      isUsersEmpty: computed(() => !store.isUsersLoading() && store.users().length === 0),
      isUsersLoaded: computed(() => !store.isUsersLoading() && store.users().length > 0),
    })
  ),

  // If you need to run a side effect, then you need to use withMethod.
  // If you need to run a method that requires parameters, then you need to use withMethods.
  // if you need to have a computed signal that requires parameters, then you need to use withMethods.
  withMethods(({alertService, loadingService, router, userData, ...store}) => ({
      loadUsers: (): void => {
        loadingService.loadingOn();
        // update state, set loading on, empty users, no selected user
        patchState(store, {isUsersLoading: true, selectedUserId: undefined, users: []});
        // use service to get data
        let isError = false;
        userData.getUsers()
          .pipe(
            catchError(() => {
              isError = true;
              alertService.showError(`Error. Unable to get users`)
              return of({});
            })
          )
          .subscribe((response: XxxUserApiResponse | {}) => {
            if (!isError) {
              const data: XxxUserApiResponse = response as XxxUserApiResponse;
              const theUsers: XxxUserType[] = data.users;
              patchState(store, {users: theUsers});
            }
            // update state, set users and loading off
            patchState(store, {isUsersLoading: false});
            loadingService.loadingOff();
          });
      },
      setSelectedUser: (userId: number): void => {
        patchState(store, {selectedUserId: userId});
        void router.navigateByUrl('/post')
      }
    })
  ),

  // If you need to use one of the methods in another method,
  // then you need to complete the definition of the method in the withMethods block,
  // and then you can use that method in a separate withMethods block.
  withMethods(({...store}) => ({
      showUsers: (): void => {
        if (!store.isUsersLoaded()) {
          store.loadUsers();
        }
      }
    })
  )
)
