import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePicturePage } from './create-picture.page';

describe('CreatePicturePage', () => {
  let component: CreatePicturePage;
  let fixture: ComponentFixture<CreatePicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
