import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockUser, mockUsers } from './xxx-user.mocks';
import { signal } from '@angular/core';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxUser } from './xxx-user';
import { XxxUserFacade } from './xxx-user-facade';
import { XxxUserType } from './xxx-user-types';

// Use extended class to test protected method.
class ExtendedXxxUser extends XxxUser {
  override rowClick(user: XxxUserType) {
    super.rowClick(user);
  }
}

describe('XxxUser', () => {
  let component: ExtendedXxxUser;
  let fixture: ComponentFixture<ExtendedXxxUser>;
  const mockUserId: number = 1;

  const mockXxxContentFacade = {
    contentByKey: jest.fn(),
  }

  const mockXxxUserFacade = {
    isUsersEmpty: jest.fn().mockReturnValue(signal(false)),
    isUsersLoaded: jest.fn().mockReturnValue(signal(false)),
    isUsersLoading: jest.fn().mockReturnValue(signal(false)),
    selectedUserId: jest.fn().mockReturnValue(signal(mockUserId)),
    setSelectedUser: jest.fn(),
    showUsers: jest.fn(),
    users: jest.fn().mockReturnValue(signal(mockUsers)),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtendedXxxUser],
      providers: [
        {provide: XxxContentFacade, useValue: mockXxxContentFacade},
        {provide: XxxUserFacade, useValue: mockXxxUserFacade}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExtendedXxxUser);
    component = fixture.componentInstance;
  });

  describe('construction', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('rowClick', () => {
    it('should call userFacade.setSelectedUser', () => {
      component.rowClick(mockUser);
      expect(mockXxxUserFacade.setSelectedUser).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
