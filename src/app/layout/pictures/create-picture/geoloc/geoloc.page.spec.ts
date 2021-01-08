import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeolocPage } from './geoloc.page';

describe('GeolocPage', () => {
  let component: GeolocPage;
  let fixture: ComponentFixture<GeolocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
