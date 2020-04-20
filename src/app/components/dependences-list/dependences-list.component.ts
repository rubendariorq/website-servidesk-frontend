import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dependences-list',
  templateUrl: './dependences-list.component.html',
  styleUrls: ['./dependences-list.component.css']
})
export class DependencesListComponent implements OnInit {

  title:String = "Dependencias";

  constructor() { }

  ngOnInit() {
  }
}
