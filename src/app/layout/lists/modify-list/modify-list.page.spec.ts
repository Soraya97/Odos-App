import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyListPage } from './modify-list.page';

describe('ModifyListPage', () => {
  let component: ModifyListPage;
  let fixture: ComponentFixture<ModifyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
