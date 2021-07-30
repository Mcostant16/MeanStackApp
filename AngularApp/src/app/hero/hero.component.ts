import { Component, OnInit } from '@angular/core';
import { HeroService} from '../shared/hero.service' ;
import {NgForm} from '@angular/forms';

import {Hero} from '../shared/hero.model';

declare var M: any;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers: [HeroService]
})
export class HeroComponent implements OnInit {

  constructor(public heroService: HeroService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshHeroList();
  }


  onSubmit(form : NgForm) {
     // console.log(form.value);  // { first: '', last: '' }
     // console.log(form.valid);  // false
     //get all the form values
     if(form.value._id == "") { 
     this.heroService.postHero(form.value).subscribe((res) => {
         this.resetForm(form);
         this.refreshHeroList();
         M.toast({html: 'Saved successfully', classes: 'rounded' });
     });
    }
    else {
    this.heroService.putHero(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshHeroList();
      M.toast({html: 'Updated successfully', classes: 'rounded' });
    }); 
    }
  }
  resetForm(form?: NgForm){
    if (form)
      form.reset();
    this.heroService.selectedHero = {
      _id: "",
      name: "",
      rank: null
    }
  }

  refreshHeroList () {
    this.heroService.getHeroList().subscribe((res) => {
      this.heroService.heroes = res as Hero [];
    });
  }

  onEdit( hero : Hero) {
    this.heroService.selectedHero = hero;
    }

  onDelete (_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this record?') == true) {
      this.heroService.deleteHero(_id).subscribe((res) => {
      this.refreshHeroList();
      this.resetForm(form);
      M.toast({html: 'Deleted successfully', classes: 'rounded' });
      });
    }

  }

}
