import { TestBed } from '@angular/core/testing';

import { CommentSignalrService } from './comment-signalr.service';

describe('CommentSignalrService', () => {
  let service: CommentSignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentSignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
