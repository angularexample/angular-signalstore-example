import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { mockPost, mockPosts } from './xxx-post.mocks';
import { XxxContent } from '../../core/xxx-content/xxx-content';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxPost } from './xxx-post';
import { XxxPostFacade } from './xxx-post-facade';
import { XxxPostType } from './xxx-post-types';

// Use extended class to test protected method.
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    XxxContent,
  ],
  selector: 'extended-xxx-post',
  templateUrl: './xxx-post.html',
})
class ExtendedXxxPost extends XxxPost {
  override selectPost(post: XxxPostType) {
    super.selectPost(post);
  }
}

describe('XxxPost', () => {
  let component: ExtendedXxxPost;
  let fixture: ComponentFixture<ExtendedXxxPost>;

  const mockXxxContentFacade = {
    contentByKey: jest.fn(),
  }

  const mockXxxPostFacade = {
    isNoSelectedPost: jest.fn().mockReturnValue(signal(false)),
    isNoSelectedUser: jest.fn().mockReturnValue(signal(false)),
    isPostsEmpty: jest.fn().mockReturnValue(signal(false)),
    isPostsLoaded: jest.fn().mockReturnValue(signal(false)),
    isPostsLoading: jest.fn().mockReturnValue(signal(false)),
    isSaveButtonDisabled: jest.fn().mockReturnValue(signal(false)),
    posts: jest.fn().mockReturnValue(signal(mockPosts)),
    selectedPost: jest.fn().mockReturnValue(signal(mockPost)),
    selectedPostId: jest.fn().mockReturnValue(signal(mockPost.id)),
    selectedUserId: jest.fn().mockReturnValue(signal(mockPost.userId)),
    setPostForm: jest.fn(),
    setSelectedPostId: jest.fn(),
    showPosts: jest.fn(),
    updatePost: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtendedXxxPost],
      providers: [
        {provide: XxxContentFacade, useValue: mockXxxContentFacade},
        {provide: XxxPostFacade, useValue: mockXxxPostFacade}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExtendedXxxPost);
    component = fixture.componentInstance;
  });

  describe('construction', () => {
    it('should create the component', () => {
      expect(component).toBeDefined();
    });
  });

  describe('selectPost', () => {
    it('should call postFacade.setSelectedPostId', () => {
      component.selectPost(mockPost);
      expect(mockXxxPostFacade.setSelectedPostId).toHaveBeenCalledWith(mockPost.id);
    });
  });
});
