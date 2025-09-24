import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { XxxHeader } from './xxx-header';

describe('XxxHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XxxHeader],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(XxxHeader);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
