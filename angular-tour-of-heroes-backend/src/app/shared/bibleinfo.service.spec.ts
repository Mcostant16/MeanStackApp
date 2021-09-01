import { TestBed } from '@angular/core/testing';

import { BibleinfoService } from './bibleinfo.service';

describe('BibleinfoService', () => {
  let service: BibleinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibleinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
