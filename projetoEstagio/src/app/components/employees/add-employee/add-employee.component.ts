import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  };

  employees: Employee[] = [];

  constructor(private employeeService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  addEmployee() {
    if (this.isEmployeeDuplicate(this.addEmployeeRequest)) {
      console.log('Employee already exists');
      alert("Employee already exists");
    } else {
      this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
        next: (employee) => {
          this.router.navigate(['employees']);
        },
        error: (response) => {
          console.log(response);
        }
      });
    }
  }

  isEmployeeDuplicate(newEmployee: Employee): boolean {
    return this.employees.some(employee => employee.name === newEmployee.name);
  }
}