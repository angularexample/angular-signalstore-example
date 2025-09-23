import { TestBed } from '@angular/core/testing';
import { XxxContentFacade } from './xxx-content-facade';
import { XxxContentStore } from './xxx-content-store';

describe('XxxContentFacade', () => {
  const mockXxxContentStore = {
    contentByKey: jest.fn(),
    isContentEmpty: jest.fn(),
    isContentLoading: jest.fn(),
    showContent: jest.fn(),
  };
  let service: XxxContentFacade;
  const contentKey: string = 'content-key';

  TestBed.configureTestingModule({
    providers: [
      XxxContentFacade,
      {provide: XxxContentStore, useValue: mockXxxContentStore},
    ],
  });

  service = TestBed.inject(XxxContentFacade);
  describe('constructor phase', () => {
    it('should be created', async () => {
      expect(service).toBeDefined();
    });

    it('should have contentByKey', async () => {
      expect(service.contentByKey).toBeDefined();
    });

    it('should have isContentEmpty', async () => {
      expect(service.isContentEmpty).toBeDefined();
    });

    it('should have isContentLoading', async () => {
      expect(service.isContentLoading).toBeDefined();
    });
  })

  describe('methods', () => {
    it('should run contentStore.contentByKey()', async () => {
      service.contentByKey(contentKey);
      expect(mockXxxContentStore.contentByKey).toHaveBeenCalledWith(contentKey);
    });

    it('should run contentStore.isContentEmpty()', async () => {
      service.isContentEmpty(contentKey);
      expect(mockXxxContentStore.isContentEmpty).toHaveBeenCalledWith(contentKey);
    });

    it('should run contentStore.isContentLoading()', async () => {
      service.isContentLoading(contentKey);
      expect(mockXxxContentStore.isContentLoading).toHaveBeenCalledWith(contentKey);
    });

    it('should run contentStore.showContent()', async () => {
      service.showContent(contentKey);
      expect(mockXxxContentStore.showContent).toHaveBeenCalledWith(contentKey);
    });
  });
});
