import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ImagesService } from '../shared/images.service';
import { NotificationService } from '../shared/notification.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from "@angular/forms";
import { Profile } from '../shared/profile-images.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 
  userDetails;
  //selectedFile : File;
  public profile: Profile;
  profileImages: []; 

  constructor(private userService: UserService, private router: Router, private imagesService: ImagesService, private notificationService: NotificationService ) { 
    this.profile = new Profile();
    this.profile.profile_id = '';
    this.profile.description = '';
    this.profile.comment = '';
    this.profile.album = '';
    this.profile.image = null;
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userDetails = res['user'];
        this.profile.profile_id = this.userDetails._id;
      },
      err=>{ }
    )
    //get userprofileimages
    this.userService.getUserProfileImages().subscribe(
      res=>{
        this.profileImages = res['images'];
        console.log(this.profileImages);
      },
      err=>{ }
    )
  }

  
  onLogout(){ 
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


   uploadFile(){
  //console.log(this.userDetails._id);
    console.log(this.profile.description);
    console.log(this.profile.profile_id);
    //console.log(this.selectedFile);
   }
   
   onFileSelected(event){
     this.profile.image = <File>event.target.files[0];
     console.log(event);
   }

  uploadFileForm(){
    const fd = new FormData();
    fd.append('myFile', this.profile.image, this.profile.image.name);  //must append images and fields.
    fd.append('profile_id', this.profile.profile_id);
    fd.append('description', this.profile.description);
    fd.append('comment', this.profile.comment);
    fd.append('album', this.profile.album);
    this.imagesService.onUpload(fd).subscribe(res => {
      console.log(res);
      this.ngOnInit();
      this.notificationService.success("Image Uploaded!!")
    });
  }
}
