import { mockXxxUserApiResponse } from './xxx-user.mocks';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxUserData } from './xxx-user-data';
import { XxxUserStore } from './xxx-user-store';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';

describe('XxxUserStore', () => {
  const mockUserId = 1;

  const mockXxxAlert = {
    showError: jest.fn(),
    showInfo: jest.fn(),
    showWarning: jest.fn(),
  }

  const mockXxxLoadingService = {
    loadingOff: jest.fn(),
    loadingOn: jest.fn(),
  }

  const mockXxxUserData = {
    getUsers: jest.fn()
  }

  TestBed.configureTestingModule({
    imports: [
      RouterModule.forRoot([])
    ],
    providers: [
      provideHttpClient(),
      {provide: XxxAlert, useValue: mockXxxAlert},
      {provide: XxxLoadingService, useValue: mockXxxLoadingService},
      {provide: XxxUserData, useValue: mockXxxUserData},
      XxxUserStore
    ],
  });
  const router = TestBed.inject(Router);
  const service = TestBed.inject(XxxUserStore);
  const spyRouterNavigate: jest.SpyInstance = jest.spyOn(router, 'navigateByUrl');

  beforeEach(() => {
    mockXxxAlert.showError.mockClear();
    mockXxxLoadingService.loadingOff.mockClear();
    mockXxxLoadingService.loadingOn.mockClear();
    mockXxxUserData.getUsers.mockClear();
    mockXxxUserData.getUsers.mockReturnValue(of(mockXxxUserApiResponse));
    spyRouterNavigate.mockClear();
  });

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

    it('should have loadUsers', () => {
      expect(service.loadUsers).toBeDefined();
    });

    it('should have setSelectedUser', () => {
      expect(service.setSelectedUser).toBeDefined();
    });

    it('should have showUsers', () => {
      expect(service.showUsers).toBeDefined();
    });
  })

  describe('isUsersEmpty', () => {
    it('should be true after initial state', () => {
      const result: Signal<boolean> = service.isUsersEmpty;
      expect(result()).toBeTruthy();
    });

    it('should false after load users', () => {
      service.loadUsers();
      const result: Signal<boolean> = service.isUsersEmpty;
      expect(result()).toBeFalsy();
    });
  })

  describe('loadUsers', () => {
    it('should run XxxUserData.getUsers', () => {
      service.loadUsers();
      expect(mockXxxUserData.getUsers).toHaveBeenCalled();
    });

    it('should run XxxLoadingService.loadingOn and loadingOff', () => {
      service.loadUsers();
      expect(mockXxxLoadingService.loadingOn).toHaveBeenCalled();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });

    it('should run XxxAlert.showError on error', () => {
      const errorMessage: string = `Error. Unable to get users`;
      mockXxxUserData.getUsers.mockReturnValue(throwError(() => new Error('some error')));
      service.loadUsers();
      expect(mockXxxAlert.showError).toHaveBeenCalledWith(errorMessage);
    });
  })

  describe('setSelectedUser', () => {
    it('should have expected selected user id', () => {
      service.setSelectedUser(mockUserId);
      const result: Signal<number | undefined> = service.selectedUserId;
      expect(result()).toEqual(mockUserId);
    });

    it('should run router navigate', () => {
      service.setSelectedUser(mockUserId);
      expect(spyRouterNavigate).toHaveBeenCalledWith('/post');
    });
  });

  describe('showUsers', () => {
    it('should call loadUsers when users are empty', () => {
      service.showUsers();
      expect(mockXxxUserData.getUsers).toHaveBeenCalled();
    });

    it('should not call loadUsers when users is not empty', () => {
      service.loadUsers();
      mockXxxUserData.getUsers.mockClear();
      service.showUsers();
      expect(mockXxxUserData.getUsers).not.toHaveBeenCalled();
    });
  });
});
