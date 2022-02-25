import { TestBed } from '@angular/core/testing';

import { WorkingCommentsService } from './working-comments.service';

describe('WorkingCommentsService', () => {
  let service: WorkingCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
