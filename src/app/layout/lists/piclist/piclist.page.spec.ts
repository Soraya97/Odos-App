import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PiclistPage } from './piclist.page';

describe('PiclistPage', () => {
  let component: PiclistPage;
  let fixture: ComponentFixture<PiclistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiclistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PiclistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
