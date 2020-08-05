import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { List } from "../list.interface";
import { SortablejsOptions } from "angular-sortablejs";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @Input() data: List;
  private editing: boolean = false;
  private newTaskName: string;
  private dataService: DataService;

  private sortableOptions: SortablejsOptions = {
    group: "shared",
    handle: ".handle",
    animation: 150,
    onEnd: (event: any) => {
      let taskId = event.item.id;
      let toListId = event.to.id;
      this.dataService.changeListId(taskId, toListId);
    },
  };

  handleSortable(item) {
    console.log(item);
    return item;
  }
  constructor(dataServ: DataService) {
    this.dataService = dataServ;
  }

  ngOnInit() {}
  onSaveNewTask() {
    let duplicate = false;
    this.data.tasks.forEach((task) => {
      if (
        task.text.replace(/\s+/g, "").toLowerCase() ===
        this.newTaskName.replace(/\s+/g, "").toLocaleLowerCase()
      ) {
        duplicate = true;
        alert("Task With Same Name Already Exists, Please Try Another Name");
      }
    });
    if (this.newTaskName.trim() !== "" && !duplicate) {
      this.dataService.saveNewTask(this.newTaskName.trim(), this.data);
      this.newTaskName = "";
    }
  }
  onRemoveList(name) {
    if (confirm("Are you sure to delete list: " + name)) {
      this.dataService.removeList(this.data.listId);
    }
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
