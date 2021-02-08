import { TestBed } from '@angular/core/testing';

import { ToDoAPIService } from './to-do-api.service';

describe('ToDoAPIService', () => {
  let service: ToDoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
