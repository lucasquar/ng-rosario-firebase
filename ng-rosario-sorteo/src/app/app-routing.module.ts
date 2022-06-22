import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantComponent } from './components/participant/participant.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { GameLayoutComponent } from './components/game-layout/game-layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: ParticipantComponent },
  { path: 'login', component: LoginComponent },
  { path: 'participant', component: ParticipantComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'game', component: GameLayoutComponent, ...canActivate(redirectUnauthorizedToLogin) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
