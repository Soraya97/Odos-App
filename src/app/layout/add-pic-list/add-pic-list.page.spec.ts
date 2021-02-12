import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPicListPage } from './add-pic-list.page';

describe('AddPicListPage', () => {
  let component: AddPicListPage;
  let fixture: ComponentFixture<AddPicListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPicListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPicListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
