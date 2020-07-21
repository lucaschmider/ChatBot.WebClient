import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: User[] = [
  { department: "Human Resources", isAdmin: true, name: "Max Mustermann", "uid": "dskajlk" },
  { department: "External Sales", isAdmin: false, name: "Bertha Mustermann", "uid": "dskajlk" },
];

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ['isAdmin', 'name', 'department', 'uid'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  public async deleteUser(uid: string): Promise<void> {
    console.log(uid);
  }
}
