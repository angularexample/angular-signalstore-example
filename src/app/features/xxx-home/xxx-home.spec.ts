import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { XxxHome } from './xxx-home';
import { XxxSanitizePipe } from '../../core/xxx-sanitize/xxx-sanitize-pipe';

describe('XxxHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XxxHome, XxxSanitizePipe],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(XxxHome);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
