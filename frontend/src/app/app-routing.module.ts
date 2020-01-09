import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from './service/auth-guard.service'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component'
import { CreatePostComponent } from './posts/create-post/create-post.component'
import { ViewPostComponent } from './posts/view-post/view-post.component'
import { EditPostComponent } from './posts/edit-post/edit-post.component'

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
	{ path: 'profile/:id', component: ProfileComponent, canActivate:[AuthGuardService] },
	{ path: 'post/new', component: CreatePostComponent, canActivate:[AuthGuardService] },
	{ path: 'post/:id', component: ViewPostComponent, canActivate:[AuthGuardService] },
	{ path: ':username/:postId', component: EditPostComponent, canActivate:[AuthGuardService] },
	{ path: ':id', component: ProfileComponent, canActivate:[AuthGuardService] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
