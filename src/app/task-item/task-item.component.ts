import { Component, OnChanges, Input } from "@angular/core";
import { Task } from "../task.interface";
import { DataService } from "../data.service";
@Component({
  selector: "task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnChanges {
  @Input() data: Task;
  private dataService;
  private editing: boolean = false;
  constructor(dataServ: DataService) {
    this.dataService = dataServ;
  }

  ngOnChanges(changes) {
    // console.log(changes)
  }

  onRemoveTask(taskName, taskId) {
    let cdata;
    this.dataService.lists.forEach((item) => {
      if (item.tasks.length > 0) {
        item.tasks.forEach((elem) => {
          if (elem.text === taskName && elem.taskId === taskId) {
            debugger;
            cdata = elem;
          }
        });
      }
    });
    if (confirm("Are you sure to delete task: " + taskName)) {
      this.dataService.removeTask(cdata);
    }
  }
  onCompleted() {
    this.dataService.save();
  }
  startEdit(input) {
    this.editing = true;
    setTimeout(() => {
      input.focus();
    }, 0);
  }
  finishEdit() {
    setTimeout(() => {
      this.editing = false;
      this.dataService.save();
    }, 300);
  }
}
