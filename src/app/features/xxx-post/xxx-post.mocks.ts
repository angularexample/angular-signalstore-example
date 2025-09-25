import { XxxPostType } from './xxx-post-types';

export const mockPost: XxxPostType = {
  body: 'mockBody',
  id: 1,
  title: 'mockTitle',
  userId: 1,
};

export const mockPost1: XxxPostType = {
  id: 2,
  userId: 1,
  title: 'mockTitle2',
  body: 'mockBody2'
};

export const mockPosts: XxxPostType[] = [mockPost, mockPost1];
