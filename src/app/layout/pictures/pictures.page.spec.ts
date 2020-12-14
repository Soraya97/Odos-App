import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PicturesPage } from './pictures.page';

describe('PicturesPage', () => {
  let component: PicturesPage;
  let fixture: ComponentFixture<PicturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PicturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
