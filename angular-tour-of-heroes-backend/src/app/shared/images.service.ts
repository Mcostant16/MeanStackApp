import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { Profile} from './profile-images.model';
import { environment} from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm  } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };

  constructor(public http: HttpClient) { }


  imageForm: FormGroup = new FormGroup({
    profile_id: new FormControl(null),
    description: new FormControl(''),
    comment: new FormControl(''),
    album: new FormControl('', Validators.minLength(8))
});

  setFormImageGroup(profile_id: string) {
    this.imageForm.setValue({
      profile_id: profile_id,
      description: ' ',
      comment: '',
      album: null
    });
 }

 onUpload(formData : FormData) {
  return  this.http.post( environment.apiBaseUrl+'/uploadImage', formData, this.noAuthHeader);
 }

}
