import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  })

  emailForm = new FormGroup({
    email: new FormControl('')
  })

  passwordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  ngOnInit() { }

  setUsername(){
    this.profileForm.setValue({
      firstName: this.profileService.user.firstName,
      lastName: this.profileService.user.lastName
    })
  }

  setEmail(){
    this.emailForm.setValue({
      email: this.profileService.user.email
    })
  }

  changeUsername(profileForm: FormGroup){
    let data = profileForm.value
    let type = 'name'
    let status = this.profileService.user.firstName == data.firstName && this.profileService.user.lastName == data.lastName
    if(!status){
      this.profileService.sampleUpdateProfile(data,type).subscribe(res =>{
        console.log(res)
      })
    }
  }

  changeEmail(emailForm: FormGroup){
    let data = emailForm.value
    let type = 'email'
    let status = this.profileService.user.email == data.email
    if(!status){
      this.profileService.sampleUpdateProfile(data, type).subscribe(res =>{
        console.log(res)
      })
    }
  }

  changePassword(passwordForm: FormGroup){
    let data = passwordForm.value
    let type = 'password'
    this.profileService.sampleUpdateProfile(data,type).subscribe(res => {
      console.log(res)
    })
  }

}
