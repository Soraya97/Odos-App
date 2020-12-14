import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListsPage } from './lists.page';

describe('ListsPage', () => {
  let component: ListsPage;
  let fixture: ComponentFixture<ListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
