import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareCardPage } from './share-card.page';

describe('ShareCardPage', () => {
  let component: ShareCardPage;
  let fixture: ComponentFixture<ShareCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
