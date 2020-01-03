import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';

describe('Alerts.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertsService = TestBed.get(AlertsService);
    expect(service).toBeTruthy();
  });
});
