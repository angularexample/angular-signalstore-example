import { TestBed } from '@angular/core/testing';
import { XxxUserFacade } from './xxx-user-facade';
import { XxxUserStore } from './xxx-user-store';

describe('XxxUserFacade', () => {
  const mockUserId=1;
  const mockXxxUserStore = {
    isUsersEmpty: jest.fn(),
    isUsersLoaded: jest.fn(),
    isUsersLoading: jest.fn(),
    selectedUserId: jest.fn(),
    setSelectedUserId: jest.fn(),
    showUsers: jest.fn(),
    users: jest.fn(),
  };
  let store: XxxUserFacade;

  TestBed.configureTestingModule({
    providers: [
      XxxUserFacade,
      {provide: XxxUserStore, useValue: mockXxxUserStore},
    ],
  });

  store = TestBed.inject(XxxUserFacade);
  describe('constructor phase', () => {
    it('should be created', () => {
      expect(store).toBeDefined();
    });

    it('should have isUsersEmpty', () => {
      expect(store.isUsersEmpty).toBeDefined();
    });

    it('should have isUsersLoaded', () => {
      expect(store.isUsersLoaded).toBeDefined();
    });

    it('should have isUsersLoading', () => {
      expect(store.isUsersLoading).toBeDefined();
    });

    it('should have selectedUserId', () => {
      expect(store.selectedUserId).toBeDefined();
    });

    it('should have users', () => {
      expect(store.users).toBeDefined();
    });
  })

  describe('showUsers', () => {
    it('should call userStore.showUsers', () => {
      store.showUsers();
      expect(mockXxxUserStore.showUsers).toHaveBeenCalled();
    });
  });

  describe('setSelectedUserId', () => {
    it('should should call userStore.setSelectedUserId', () => {
      store.setSelectedUserId(mockUserId);
      expect(mockXxxUserStore.setSelectedUserId).toHaveBeenCalledWith(mockUserId);
    });
  });
});
