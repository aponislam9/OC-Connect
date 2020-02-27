import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventViewPage } from './event-view.page';

describe('EventViewPage', () => {
  let component: EventViewPage;
  let fixture: ComponentFixture<EventViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
