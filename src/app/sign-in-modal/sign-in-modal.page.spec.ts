import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInModalPage } from './sign-in-modal.page';

describe('SignInModalPage', () => {
  let component: SignInModalPage;
  let fixture: ComponentFixture<SignInModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
