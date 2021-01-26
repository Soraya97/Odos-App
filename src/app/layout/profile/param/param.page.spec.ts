import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParamPage } from './param.page';

describe('ParamPage', () => {
  let component: ParamPage;
  let fixture: ComponentFixture<ParamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
