import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantTableComponent } from './components/participant-table/participant-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './components/login/login.component';
import { GameLayoutComponent } from './components/game-layout/game-layout.component';
import { CommentsTableComponent } from './components/comments-table/comments-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    ParticipantTableComponent,
    LoginComponent,
    GameLayoutComponent,
    CommentsTableComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
