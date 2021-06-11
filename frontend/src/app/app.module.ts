import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgbModule,NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'
import { StorageServiceModule } from 'angular-webstorage-service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import {MatExpansionModule} from '@angular/material/expansion'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table'
import { MomentModule } from 'angular2-moment'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { MainCarousalComponent } from './carousal/main-carousal/main-carousal.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ViewPostComponent } from './posts/view-post/view-post.component'
import { ViewAllPostsComponent } from './posts/view-all-posts/view-all-posts.component'
import { ProfileComponent } from './profile/profile.component';
import { DeleteCommentDialogBoxComponent } from './dialog-box/delete-comment-dialog-box/delete-comment-dialog-box.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';
import { ProfilePhotoFormComponent } from './signup/profile-photo-form/profile-photo-form.component';
import { MainComponent } from './main/main.component';
import { PostComponent } from './posts/post/post.component';
import { ErrorIntercept } from './error.interceptor';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { FollowerListComponent } from './profile/follower-list/follower-list.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		MainCarousalComponent,
		LoginComponent,
		SignupComponent,
		HomeComponent,
		SidebarComponent,
		ViewPostComponent,
		ViewAllPostsComponent,
		ProfileComponent,
		DeleteCommentDialogBoxComponent,
		SignupFormComponent,
		ProfilePhotoFormComponent,
		MainComponent,
		PostComponent,
		EditProfileComponent,
		FollowerListComponent
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
		NgbTypeaheadModule,
		MatListModule
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
		DeleteCommentDialogBoxComponent
	]
})
export class AppModule { }
