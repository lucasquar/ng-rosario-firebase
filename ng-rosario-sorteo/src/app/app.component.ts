import { Component, OnInit } from '@angular/core';
import { Auth, signInWithPopup, signOut, GoogleAuthProvider, User, user } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { addDoc, query, where } from '@firebase/firestore';
import { mergeMap, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user!: User | undefined;
  public isParticipating = false;

  public form = this.formBuilder.group({
    nickname: ['', Validators.required],
    valuation: [80, Validators.required],
    displayImage: [true],
    comment: [''],
  });

  private readonly participantsCollection = collection(this.firestore, 'participants');

  constructor(private auth: Auth, private formBuilder: FormBuilder, private firestore: Firestore) {}

  ngOnInit(): void {
    user(this.auth).pipe(
      mergeMap(user => {
        console.log((user))
        if (user) {
          this.user = user;
          return collectionData(query(this.participantsCollection, where('userId', '==', this.user.uid)));
        }
        return of(null);
      })
    ).subscribe((result: any) => {
      console.log((result))
      if(result?.length > 0) {
        this.isParticipating = true;
      }
    });
  }

  public login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public logout() {
    signOut(this.auth).then(() => this.user = undefined);
  }

  public onSubmit() {
    const participant: Participant = {
      userId: this.auth.currentUser?.uid ?? '',
      comment: this.form.get('comment')?.value,
      imageSrc: this.form.get('displayImage')?.value ? this.auth.currentUser?.photoURL as string : 'https://i.pravatar.cc/300',
      nickname: this.form.get('nickname')?.value,
      valuation: this.form.get('valuation')?.value

    }
    addDoc(this.participantsCollection, participant).then(() => this.isParticipating = true);
  }
}

export interface Participant {
  userId: string;
  imageSrc: string;
  nickname: string;
  valuation: number;
  comment: string;
}
