import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { StorageServiceModule } from 'angular-webstorage-service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule,MatIconModule,MatButtonModule,MatCheckboxModule } from '@angular/material'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MDBBootstrapModule } from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { NavbarComponent } from './header/navbar/navbar.component'
import { CarousalComponent } from './header/carousal/carousal.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { CreatePostComponent } from './create-post/create-post.component'
import { AuthGuardService } from './service/auth-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewPostComponent } from './view-post/view-post.component'

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavbarComponent,
		CarousalComponent,
		LoginComponent,
		SignupComponent,
		HomeComponent,
		CreatePostComponent,
		SidebarComponent,
		ViewPostComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		StorageServiceModule,
		RouterModule.forRoot([
			{ path: 'login', component: LoginComponent },
			{ path: 'signup', component: SignupComponent },
			{ path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
			{ path: 'post/new', component: CreatePostComponent, canActivate:[AuthGuardService] }
		]),
		BrowserAnimationsModule,
		NgbModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MDBBootstrapModule.forRoot()
	],
	providers: [HomeComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
