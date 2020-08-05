import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from "../data.service";
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { SortablejsModule } from "angular-sortablejs";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SortablejsModule.forRoot({ animation: 150 })],
      declarations: [ ListComponent, TaskItemComponent],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
