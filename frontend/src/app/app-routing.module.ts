import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from './service/auth-guard.service'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component'
import { ViewPostComponent } from './posts/view-post/view-post.component'
import { MainComponent } from './main/main.component'
import { PostComponent } from './posts/post/post.component'

const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
	{ path: 'profile/:id', component: ProfileComponent, canActivate:[AuthGuardService] },
	{ path: 'post/new', component: PostComponent, canActivate:[AuthGuardService]},
	{ path: 'post/:id', component: ViewPostComponent, canActivate:[AuthGuardService] },
	{ path: ':username/:postId/edit', component: PostComponent, canActivate:[AuthGuardService] },
	{ path: ':id', component: ProfileComponent, canActivate:[AuthGuardService] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
