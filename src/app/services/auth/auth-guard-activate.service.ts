import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardActivateService implements CanActivate {
    constructor(private afAuth: AngularFireAuth, public router: Router) { }

    canActivate(): boolean {
        this.afAuth.user.subscribe(user => {
            if (!user) {
                this.router.navigate(['login']);
                return false;
            }
        });
        return true;
    }
}