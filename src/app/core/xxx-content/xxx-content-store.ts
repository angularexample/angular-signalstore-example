import { catchError, of } from 'rxjs';
import { computed, inject, Signal } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { XxxAlert } from '../xxx-alert/xxx-alert';
import {
  XxxContentApi,
  xxxContentInitialState,
  XxxContentState,
  XxxContentStatus,
  XxxContentType
} from './xxx-content-types';
import { XxxContentData } from './xxx-content-data';

/**
 * XxxContentStore is the feature state for all content.
 * State management for Angular using NgRx SignalStore.
 * Where we store all the properties needed to support the view.
 * It can be local scope to a component or global scope to the app.
 * Adding root provider makes it global scope to the app.
 * The signalStore method is a factory function that returns a store class object
 */
export const XxxContentStore = signalStore(
  {providedIn: 'root'},

  // In withState, we define the initial state of the store.
  // All properties must be present in the initial state.
  withState<XxxContentState>(xxxContentInitialState),

  // In withProps, we define the properties needed to support the view.
  // It is similar to where we inject the services in the construction phase of a class.
  withProps(() => ({
      alertService: inject(XxxAlert),
      contentData: inject(XxxContentData)
    })
  ),

  // If you need to run a side effect, then you need to use withMethod.
  // If you need to run a method that requires parameters, then you need to use withMethods.
  // if you need to have a computed signal that requires parameters, then you need to use withMethods.
  withMethods(({alertService, contentData, ...store}) => ({
      contentByKey: (key: string): Signal<XxxContentType | undefined> => computed(() =>
        store.contents().find((item: XxxContentType) => item.key === key)
      ),
      loadContent: (key: string): void => {
        // remove any existing content
        let theContents: XxxContentType[] = store.contents().filter((item: XxxContentType) => item.key !== key);
        // create a new content item
        // set status to loading
        let content: XxxContentType = {
          key,
          status: XxxContentStatus.LOADING
        };
        // update state, add new content item to contents
        theContents.push(content);
        patchState(store, {contents: theContents});
        // use service to get data
        let isError = false;
        contentData.getContent(key)
          .pipe(
            catchError(() => {
              isError = true;
              alertService.showError(`Error. Unable to get content for ${key}`)
              return of({});
            })
          )
          .subscribe((response: XxxContentApi | {}) => {
            // remove any existing content
            theContents = store.contents().filter((item: XxxContentType) => item.key !== key);
            // create a new content item
            // set status to loaded
            content = {
              key,
              status: isError ? XxxContentStatus.ERROR : XxxContentStatus.LOADED,
            };
            if (!isError) {
              // set content data
              const data: XxxContentApi = response as XxxContentApi;
              content.contentModel = data.contentModel;
              // check for empty content data
              if (Object.keys(content.contentModel).length === 0) {
                content.status = XxxContentStatus.EMPTY;
              }
            }
            // update state, add new content item to contents
            theContents.push(content);
            patchState(store, {contents: [...theContents]});
          });
      },
    })
  ),

  // If you need to use one of the methods in another method,
  // then you need to complete the definition of the method in the withMethods block,
  // and then you can use that method in a separate withMethods block.
  withMethods(({...store}) => ({
      isContentEmpty: (key: string): Signal<boolean> => computed(() => {
        const content: XxxContentType | undefined = store.contentByKey(key)();
        return content !== undefined && content.status === XxxContentStatus.EMPTY;
      }),
      isContentError: (key: string): Signal<boolean> => computed(() => {
        const content: XxxContentType | undefined = store.contentByKey(key)();
        return content !== undefined && content.status === XxxContentStatus.ERROR;
      }),
      showContent: (key: string): void => {
        if (!store.contents().some((item: XxxContentType) => item.key === key)) {
          store.loadContent(key);
        }
      }
    })
  )
)
