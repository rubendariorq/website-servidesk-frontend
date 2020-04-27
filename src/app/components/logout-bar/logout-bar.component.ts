import { Component, OnInit, Input } from '@angular/core';
import { DependencesListComponent } from '../dependences-list/dependences-list.component';
import { DependenciesAddComponent } from '../dependencies-add/dependencies-add.component';

@Component({
  selector: 'app-logout-bar',
  templateUrl: './logout-bar.component.html',
  styleUrls: ['./logout-bar.component.css']
})
export class LogoutBarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
