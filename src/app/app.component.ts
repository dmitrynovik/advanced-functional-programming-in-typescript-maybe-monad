import { Component, OnInit } from '@angular/core';
import { EmployeeRepository } from "./employee.repository";
import { Maybe } from './maybe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'advanced-functional-programming-in-typescript-maybe-monad';
  repository: EmployeeRepository;

  ngOnInit(): void {
    const employeeIdInputEl = document.getElementById("employeeIdInput") as HTMLInputElement;
    const findEmployeeButtonEl = document.getElementById("findEmployeeButton");
    const searchResultsEl = document.getElementById("searchResults");

    this.repository = new EmployeeRepository();

    findEmployeeButtonEl.addEventListener("click", () => {
      const supervisorName = this.getSupervisorName(Maybe.fromValue(employeeIdInputEl.value));
      searchResultsEl.innerText = `Supervisor name: ${supervisorName.getOrElse("could not find")}`;
    });
  }

  getSupervisorName(maybeEnteredId: Maybe<string>): Maybe<string> {
    return maybeEnteredId
        .flatMap(employeeIdString => Maybe.fromValue(parseInt(employeeIdString))) // parseInt can fail
        .flatMap(employeeId => this.repository.findById(employeeId))
        .flatMap(employee => employee.supervisorId)
        .flatMap(supervisorId => this.repository.findById(supervisorId))
        .map(supervisor => supervisor.name);
  }
}

