import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { userPicPage } from './userPic.page';

describe('userPicPage', () => {
  let component: userPicPage;
  let fixture: ComponentFixture<userPicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ userPicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(userPicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
