import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateListPage } from './create-list.page';

describe('CreateListPage', () => {
  let component: CreateListPage;
  let fixture: ComponentFixture<CreateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
