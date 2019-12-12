import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { StorageServiceModule } from 'angular-webstorage-service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { CarousalComponent } from './header/carousal/carousal.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component'

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavbarComponent,
		CarousalComponent,
		LoginComponent,
		SignupComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		StorageServiceModule,
		RouterModule.forRoot([
			{ path: 'login', component: LoginComponent },
			{ path: 'signup', component: SignupComponent },
			{ path: 'home', component: HomeComponent}
		])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
