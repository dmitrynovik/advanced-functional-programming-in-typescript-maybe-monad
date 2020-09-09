import { Component, OnInit } from '@angular/core';
import { EmployeeRepository } from "./employee.repository";

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
      const supervisorName = this.getSupervisorName(employeeIdInputEl.value);
      if (supervisorName) {
          searchResultsEl.innerText = `Supervisor name: ${supervisorName}`;
      } else {
          searchResultsEl.innerText = "Could not find supervisor for given id";
      }
  });
}

  getSupervisorName(enteredId: string) {
      if (enteredId) {
          const employee = this.repository.findById(parseInt(enteredId));
          if (employee && employee.supervisorId) {
              const supervisor = this.repository.findById(employee.supervisorId);
              if (supervisor) {
                  return supervisor.name;
              }
          }
      }
  }   
}

