import { TestBed } from '@angular/core/testing';
import { XxxContentFacade } from './xxx-content-facade';
import { XxxContentStore } from './xxx-content-store';

describe('XxxContentFacade', () => {
  const mockXxxContentStore = {
    contentByKey: jest.fn(),
    isContentEmpty: jest.fn(),
    isContentError: jest.fn(),
    showContent: jest.fn(),
  };
  const contentKey: string = 'content-key';

  TestBed.configureTestingModule({
    providers: [
      XxxContentFacade,
      {provide: XxxContentStore, useValue: mockXxxContentStore},
    ],
  });

  const service: XxxContentFacade = TestBed.inject(XxxContentFacade);
  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });

    it('should have contentByKey', () => {
      expect(service.contentByKey).toBeDefined();
    });

    it('should have isContentEmpty', () => {
      expect(service.isContentEmpty).toBeDefined();
    });

    it('should have isContentError', () => {
      expect(service.isContentError).toBeDefined();
    });
  })

  describe('methods', () => {
    it('should run contentStore.contentByKey', () => {
      service.contentByKey(contentKey);
      expect(mockXxxContentStore.contentByKey).toHaveBeenCalledWith(contentKey);
    });

    it('should run contentStore.isContentEmpty', () => {
      service.isContentEmpty(contentKey);
      expect(mockXxxContentStore.isContentEmpty).toHaveBeenCalledWith(contentKey);
    });

    it('should run contentStore.isContentLoading', () => {
      service.isContentError(contentKey);
      expect(mockXxxContentStore.isContentError).toHaveBeenCalledWith(contentKey);
    });

    it('should run contentStore.showContent', () => {
      service.showContent(contentKey);
      expect(mockXxxContentStore.showContent).toHaveBeenCalledWith(contentKey);
    });
  });
});
