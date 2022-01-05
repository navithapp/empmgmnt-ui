import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { EmployeeService } from "../employee.service";
// import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    
    constructor(
        private empService: EmployeeService, private router: Router) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let isAuth = !!this.empService.getEmployee();
        if (isAuth) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }

    canActivateChild(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(router, state);
    }
}