import { mockContentApiEmpty, mockContentApiHome, mockContentHome } from './xxx-content.mocks';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { XxxAlert } from '../xxx-alert/xxx-alert';
import { XxxContentData } from './xxx-content-data';
import { XxxContentStore } from './xxx-content-store';
import { XxxContentType } from './xxx-content-types';

describe('XxxContentStore', () => {
  type XxxContentStore = InstanceType<typeof XxxContentStore>;
  let service: XxxContentStore;
  let contentKey: string;

  const mockXxxContentData = {
    getContent: jest.fn()
  }

  const mockXxxAlert = {
    showError: jest.fn(),
    showInfo: jest.fn(),
    showWarning: jest.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: XxxAlert, useValue: mockXxxAlert},
        {provide: XxxContentData, useValue: mockXxxContentData},
        XxxContentStore
      ],
    });
    service = TestBed.inject(XxxContentStore);
    contentKey = 'home';
    mockXxxContentData.getContent.mockReturnValue(of(mockContentApiHome));
  });

  afterEach(() => {
    mockXxxAlert.showError.mockClear();
    mockXxxContentData.getContent.mockClear();
  })

  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });

    it('should have contentByKey', () => {
      expect(service.contentByKey).toBeDefined();
    });

    it('should have loadContent', () => {
      expect(service.loadContent).toBeDefined();
    });

    it('should have isContentEmpty', () => {
      expect(service.isContentEmpty).toBeDefined();
    });

    it('should have isContentError', () => {
      expect(service.isContentError).toBeDefined();
    });

    it('should have showContent', () => {
      expect(service.showContent).toBeDefined();
    });
  })

  describe('loadContent', () => {
    it('should handle success', () => {
      service.loadContent(contentKey);
      expect(mockXxxContentData.getContent).toHaveBeenCalledWith(contentKey);
    });

    it('should handle error', () => {
      const errorMessage: string = `Error. Unable to get content for ${contentKey}`;
      mockXxxContentData.getContent.mockReturnValue(throwError(() => new Error('some error')));
      service.loadContent(contentKey);
      expect(mockXxxAlert.showError).toHaveBeenCalledWith(errorMessage);
    });
  })

  describe('contentByKey', () => {
    it('should return expected content by key', () => {
      service.loadContent(contentKey);
      const result: Signal<XxxContentType | undefined> = service.contentByKey(contentKey);
      expect(result()).toEqual(mockContentHome);
    });
  });

  describe('isContentEmpty', () => {
    it('should return true when content is empty', () => {
      contentKey = 'empty';
      mockXxxContentData.getContent.mockReturnValue(of(mockContentApiEmpty));
      service.loadContent(contentKey);
      const result: Signal<boolean> = service.isContentEmpty(contentKey);
      expect(result()).toBe(true);
    });
  });

  describe('isContentError', () => {
    it('should return true when content has error', () => {
      mockXxxContentData.getContent.mockReturnValue(throwError(() => new Error('some error')));
      service.loadContent(contentKey);
      const result: Signal<boolean> = service.isContentError(contentKey);
      expect(result()).toBe(true);
    });
  });

  describe('showContent', () => {
    it('should call loadContent when content does not exist', () => {
      contentKey = 'none';
      service.showContent(contentKey);
      expect(mockXxxContentData.getContent).toHaveBeenCalled();
    });

    it('should not call loadContent when content exists', () => {
      service.loadContent(contentKey);
      mockXxxContentData.getContent.mockClear();
      service.showContent(contentKey);
      expect(mockXxxContentData.getContent).not.toHaveBeenCalled();
    });
  });
});
