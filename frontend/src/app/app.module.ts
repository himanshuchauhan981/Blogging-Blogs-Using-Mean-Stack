import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgbModule,NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'
import { StorageServiceModule } from 'ngx-webstorage-service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule,MatIconModule,MatButtonModule,MatCheckboxModule } from '@angular/material'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table'
import { MomentModule } from 'angular2-moment'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { NavbarComponent } from './header/navbar/navbar.component'
import { CarousalComponent } from './header/carousal/carousal.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ViewPostComponent } from './posts/view-post/view-post.component'
import { ViewAllPostsComponent } from './posts/view-all-posts/view-all-posts.component'
import { ProfileComponent } from './profile/profile.component';
import { ProfileDialogBoxComponent } from './dialog-box/profile-dialog-box/profile-dialog-box.component';
import { PasswordDialogBoxComponent } from './dialog-box/password-dialog-box/password-dialog-box.component';
import { DeleteCommentDialogBoxComponent } from './dialog-box/delete-comment-dialog-box/delete-comment-dialog-box.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';
import { ProfilePhotoFormComponent } from './signup/profile-photo-form/profile-photo-form.component';
import { MainComponent } from './main/main.component';
import { PostComponent } from './posts/post/post.component';
import { ErrorIntercept } from './error.interceptor'

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavbarComponent,
		CarousalComponent,
		LoginComponent,
		SignupComponent,
		HomeComponent,
		SidebarComponent,
		ViewPostComponent,
		ViewAllPostsComponent,
		ProfileComponent,
		ProfileDialogBoxComponent,
		PasswordDialogBoxComponent,
		DeleteCommentDialogBoxComponent,
		SignupFormComponent,
		ProfilePhotoFormComponent,
		MainComponent,
		PostComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		StorageServiceModule,
		BrowserAnimationsModule,
		NgbModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatTooltipModule,
		MomentModule,
		InfiniteScrollModule,
		MatExpansionModule,
		MatDialogModule,
		MatTableModule,
		NgbTypeaheadModule
	],
	providers: [
		HomeComponent,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorIntercept,
			multi: true
		}
	],
	bootstrap: [AppComponent],
	entryComponents: [
		ProfileDialogBoxComponent,
		PasswordDialogBoxComponent,
		DeleteCommentDialogBoxComponent
	]
})
export class AppModule { }
