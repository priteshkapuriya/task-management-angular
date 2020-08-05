import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from "./data.service";
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { TaskItemComponent } from './task-item/task-item.component';

import { SortablejsModule } from "angular-sortablejs";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SortablejsModule.forRoot({ animation: 150 })],
      declarations: [
        AppComponent,
        ListComponent,
        TaskItemComponent
      ],
      providers:[DataService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
