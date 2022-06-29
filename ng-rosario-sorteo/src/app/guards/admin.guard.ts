import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private readonly adminsCollection = collection(this.firestore, 'admins');

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return user(this.auth).pipe(
      mergeMap(user => {
        if (user) {
          return collectionData(query(this.adminsCollection, where('userIds', 'array-contains', user.uid)));
        }
        return of(null);
      }),
      map((result: any) => {
        const isAdmin = result?.length > 0;
        if (!isAdmin) {
          this.router.navigate(['participant']);
        }
        return isAdmin;
      })
    );
  }

}
