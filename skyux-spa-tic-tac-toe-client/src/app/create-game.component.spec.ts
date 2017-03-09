import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGameComponent } from './create-game.component';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGameComponent]
    });
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
  });

  it('should render a visible button', () => {
    let element = fixture.nativeElement as HTMLElement;
  })
});
