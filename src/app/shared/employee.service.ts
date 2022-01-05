import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee: any;

  constructor(private http: HttpClient) { }

  getEmployee() {
    return this.employee;
  }

  login(loginDetails: any) {
    // return this.http.get<any>('http://localhost:8080/employee/login')
    return this.http.post<any>('http://localhost:8080/employee/login', loginDetails)
      .pipe(
        tap((employee) => {
          this.employee = employee;
        }));
  }
}
