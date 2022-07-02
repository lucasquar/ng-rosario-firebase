import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { GameLayoutComponent } from './components/game-layout/game-layout.component';
import { LoginComponent } from './components/login/login.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { RulesComponent } from './components/rules/rules.component';
import { AdminGuard } from './guards/admin.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'game', component: GameLayoutComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'participant', component: ParticipantComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'rules', component: RulesComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: '',   redirectTo: '/participant', pathMatch: 'full' },
  { path: '**', component: ParticipantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
