import { Component, NgZone } from "@angular/core";
import { DataService } from "./data.service";
import { List } from "./list.interface";
import { SortablejsOptions } from "angular-sortablejs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  private lists: Array<List>;
  private addListText: String;
  private dataService: DataService;
  private sortableOptions: SortablejsOptions = {
    group: "listSortable",
    animation: 150,
    handle: ".handle",
    onUpdate: (event: any) => {
      this.dataService.save();
    },
  };
  constructor(dataServ: DataService, zone: NgZone) {
    dataServ.subscribeToLists((data) => {
      this.lists = data;
      zone.run(() => {
        console.log("Update");
      });
    });
    this.dataService = dataServ;
  }
  onSaveNewList() {
    let duplicate = false;
    this.lists.forEach((list) => {
      if (
        this.addListText.replace(/\s+/g, "").toLowerCase() ===
        list.name.replace(/\s+/g, "").toLowerCase()
      ) {
        duplicate = true;
        alert("List With Same Name Already Exists, Please Try Another Name");
      }
    });
    if (this.addListText.trim() !== "" && !duplicate) {
      this.dataService.saveNewList(this.addListText.trim());
      this.addListText = "";
    }
  }
}
