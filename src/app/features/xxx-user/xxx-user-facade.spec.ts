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
    setSelectedUser: jest.fn(),
    showUsers: jest.fn(),
    users: jest.fn(),
  };
  let service: XxxUserFacade;

  TestBed.configureTestingModule({
    providers: [
      XxxUserFacade,
      {provide: XxxUserStore, useValue: mockXxxUserStore},
    ],
  });

  service = TestBed.inject(XxxUserFacade);
  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });

    it('should have isUsersEmpty', () => {
      expect(service.isUsersEmpty).toBeDefined();
    });

    it('should have isUsersLoaded', () => {
      expect(service.isUsersLoaded).toBeDefined();
    });

    it('should have isUsersLoading', () => {
      expect(service.isUsersLoading).toBeDefined();
    });

    it('should have selectedUserId', () => {
      expect(service.selectedUserId).toBeDefined();
    });

    it('should have users', () => {
      expect(service.users).toBeDefined();
    });
  })

  describe('showUsers', () => {
    it('should call userStore.showUsers', () => {
      service.showUsers();
      expect(mockXxxUserStore.showUsers).toHaveBeenCalled();
    });
  });

  describe('setSelectedUser', () => {
    it('should should call userStore.setSelectedUser', () => {
      service.setSelectedUser(mockUserId);
      expect(mockXxxUserStore.setSelectedUser).toHaveBeenCalledWith(mockUserId);
    });
  });
});
