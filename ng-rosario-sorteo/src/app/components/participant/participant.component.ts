import { Component, OnInit } from '@angular/core';
import { Auth, signOut, User, user } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, query, where } from '@firebase/firestore';
import { mergeMap, of } from 'rxjs';
import { IParticipant } from 'src/app/models/participant.interface';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  public user!: User | undefined;
  public isParticipating = false;

  public form = this.formBuilder.group({
    nickname: ['', Validators.required],
    valuation: [80, Validators.required],
    displayImage: [true],
    comment: [''],
  });

  private readonly participantsCollection = collection(this.firestore, 'participants');

  constructor(
    private auth: Auth,
    private formBuilder: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    user(this.auth).pipe(
      mergeMap(user => {
        if (user) {
          this.user = user;
          return collectionData(query(this.participantsCollection, where('userId', '==', this.user.uid)));
        }
        return of(null);
      })
    ).subscribe((result: any) => {
      if (result?.length > 0) {
        this.isParticipating = true;
      }
    });
  }

  public formatLabel(value: number): string | number {
    if (value === 100) {
      return `⭐`;
    } else if (value <= 60) {
      return `😔`;
    }

    return value;
  }

  public logout() {
    signOut(this.auth).then(() => {
      this.user = undefined;
      this.router.navigate(['login']);
    });
  }

  public onSubmit() {
    const participant: IParticipant = {
      userId: this.auth.currentUser?.uid ?? '',
      comment: this.form.get('comment')?.value,
      imageSrc: this.form.get('displayImage')?.value ? this.auth.currentUser?.photoURL as string : 'https://i.pravatar.cc/300',
      nickname: this.form.get('nickname')?.value,
      valuation: this.form.get('valuation')?.value

    }

    addDoc(this.participantsCollection, participant).then(() => this.isParticipating = true);
  }
}
