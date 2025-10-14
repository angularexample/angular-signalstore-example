import { catchError, of } from 'rxjs';
import { computed, inject, Signal } from '@angular/core';
import { isPostsEqual } from './xxx-post-utilities';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { Router } from '@angular/router';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';
import { xxxPostInitialState, XxxPostState, XxxPostType } from './xxx-post-types';
import { XxxPostData } from './xxx-post-data'
import { XxxUserFacade } from '../xxx-user/xxx-user-facade';

/**
 * XxxPostStore is the feature state for the post and post-edit pages.
 * State management for Angular using NgRx SignalStore.
 * Where we store all the properties needed to support the view.
 * It can be local scope to a component or global scope to the app.
 * Adding root provider makes it global scope to the app.
 * The signalStore method is a factory function that returns a store class object
 */
export const XxxPostStore = signalStore(
  {providedIn: 'root'},

  // In withState, we define the initial state of the store.
  // All properties must be present in the initial state.
  withState<XxxPostState>(xxxPostInitialState),

  // In withProps, we define the properties needed to support the view.
  // It is similar to where we inject the services in the construction phase of a class.
  withProps(() => ({
      alertService: inject(XxxAlert),
      loadingService: inject(XxxLoadingService),
      postData: inject(XxxPostData),
      router: inject(Router),
      userFacade: inject(XxxUserFacade)
    })
  ),

  // In withComputed, we define the computed properties needed to support the view.
  // Computed properties are properties that are derived from other properties.
  // They cannot have a parameter.
  withComputed((store) => ({
      isNoSelectedUser: computed(() => store.selectedUserId === undefined ||
        store.selectedUserId() === undefined),
      isPostsEmpty: computed(() => !store.isPostsLoading() && store.posts().length === 0),
      isPostsLoaded: computed(() => !store.isPostsLoading() && store.posts().length > 0),
      selectedPost: computed(() => {
        let post: XxxPostType | undefined;
        const posts: XxxPostType[] = store.posts();
        const selectedPostId: Signal<number | undefined> | undefined = store.selectedPostId;
        if (selectedPostId && selectedPostId() !== undefined) {
          post = posts.find(item => item.id === selectedPostId());
        }
        return post;
      }),
    })
  ),

  // If you need to use one of the computed properties in another computed property,
  // then you need to complete the definition of the computed property in the withComputed block.
  // And then you can use that computed property in a separate withComputed block.
  withComputed((store) => ({
      isNoSelectedPost: computed(() => store.selectedPostId === undefined ||
        store.selectedPostId() === undefined ||
        store.selectedPost === undefined ||
        store.selectedPost() === undefined
      ),
      isSaveButtonDisabled: computed(() => {
        const postForm: XxxPostType | undefined = store.postForm !== undefined ? store.postForm() : undefined;
        const selectedPost: XxxPostType | undefined = store.selectedPost !== undefined ? store.selectedPost() : undefined;
        return isPostsEqual(postForm, selectedPost);
      })
    })
  ),
  // If you need to run a side effect, then you need to use withMethod.
  // If you need to run a method that requires parameters, then you need to use withMethods.
  // if you need to have a computed signal that requires parameters, then you need to use withMethods.
  withMethods(({alertService, loadingService, router, postData, ...store}) => ({
      getPosts: (): void => {
        patchState(store, {isPostsLoading: true, posts: [], selectedPostId: undefined});
        let isError = false;
        const userId: number | undefined = store.selectedUserId ? store.selectedUserId() : undefined;
        if (userId !== undefined) {
          // Posts will not load without a selected user id
          // There should never be the case where userId is undefined
          loadingService.loadingOn();
          postData.getPosts(userId)
            .pipe(
              catchError(() => {
                isError = true;
                alertService.showError(`Error. Unable to get posts for user ${userId}`)
                return of([]);
              })
            )
            .subscribe((response: XxxPostType[]) => {
              if (!isError) {
                patchState(store, {posts: response});
              }
              patchState(store, {isPostsLoading: false});
              loadingService.loadingOff();
            });
        }
      },
      setPostForm: (post: XxxPostType): void => {
        patchState(store, {postForm: post});
      },
      setSelectedPostId: (postId: number): void => {
        patchState(store, {postForm: undefined, selectedPostId: postId});
        void router.navigateByUrl('/post/edit')
      },
      setSelectedUserId: (userId: number): void => {
        patchState(store, {...xxxPostInitialState, selectedUserId: userId});
      },
      updatePost: (): void => {
        const post: XxxPostType | undefined = store.postForm ? store.postForm() : undefined;
        if (post === undefined) {
          //unexpected error, post should not be undefined
          const errorMessage: string = 'Error. No post available to update.'
          alertService.showError(errorMessage);
        } else {
          loadingService.loadingOn();
          let isError: boolean = false;
          postData.updatePost(post).pipe(
            catchError(() => {
              isError = true;
              const errorMessage: string = `Error. Unable to update post: ${post.id}`;
              alertService.showError(errorMessage);
              return of({});
            })
          ).subscribe((postResponse) => {
            if (!isError && Object.keys(postResponse).length > 0) {
              // remove the old post, add the new one, sort by id
              const posts = store.posts().filter(item => item.id !== post.id);
              const updatedPost: XxxPostType = {...post};
              posts.push(updatedPost);
              posts.sort((a: XxxPostType, b: XxxPostType) => a.id - b.id);
              patchState(store,{posts});
              alertService.showInfo('Successfully updated post:  ' + post.id);
              void router.navigateByUrl('/post')
            }
            loadingService.loadingOff();
          })
        }
      }
    })
  ),

  // If you need to use one of the methods in another method,
  // then you need to complete the definition of the method in the withMethods block,
  // and then you can use that method in a separate withMethods block.
  withMethods(({userFacade, ...store}) => ({
      // Logic to show user posts
      // 1. If there is no selected user in the user state, then do nothing
      // 2. If the selected user is different from the user id in the Post state,
      //    then run setSelectedUserId
      // 3. If posts are not loaded, then run loadPosts
      showPosts: (): void => {
        const userSelectedUserId: number | undefined = userFacade.selectedUserId();
        if (userSelectedUserId !== undefined) {
          const postSelectedUserId: number | undefined = store.selectedUserId ? store.selectedUserId() : undefined;
          if (!postSelectedUserId || (postSelectedUserId && postSelectedUserId !== userSelectedUserId)) {
            store.setSelectedUserId(userSelectedUserId);
          }
          if (store.isPostsEmpty()) {
            store.getPosts()
          }
        }
      }
    })
  )
)
