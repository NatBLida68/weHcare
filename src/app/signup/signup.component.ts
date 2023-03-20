import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  role:string='';
  user:boolean=false;
  coach:boolean=false;
  errorMessage = false;
  userregisterForm:FormGroup;



  constructor( private router:ActivatedRoute,private builder:FormBuilder, private service:SignupService) {
    this.router.params.subscribe(a=>console.log(this.role=a['role']));
    this.role === 'user'?this.user=true:'';
    this.role === 'coach'?this.coach=true:'';
    this.userregisterForm=this.builder.group({
      name:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(50)])),
      password:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(10)])),
      //dateOfBirth:this.builder.control('',Validators.required),
      dateOfBirth: new FormControl('', [
        Validators.required,
        ageCalculator  //custom validator
      ]),
      gender:this.builder.control('',Validators.required),
      mobileNumber:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
      email:this.builder.control('',Validators.required),
      pincode:this.builder.control('',Validators.minLength(6)),
      city:this.builder.control('',Validators.compose([Validators.minLength(6),Validators.maxLength(20)])),
      state:this.builder.control('',Validators.compose([Validators.minLength(6),Validators.maxLength(20)])),
      country:this.builder.control('',Validators.compose([Validators.minLength(6),Validators.maxLength(20)])),
      
  
  
  
    });

   }
  ngOnInit() {
    
    
  }


  
  userSignup()
  {
    if(this.userregisterForm.valid)
    {
      this.service.saveUser(this.userregisterForm.value).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })

    }
    else{
      this.errorMessage=true;
    }
    
  }

}



function ageCalculator(c: FormControl) {
  console.log(c.value);

  var dob = new Date(c.value);  
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();  
      
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);   
      
    //extract year from date      
    var year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    var age = Math.abs(year - 1970); 
    

  return (age >=20 && age <= 100) ? null : {
    age: {
      valid: false
    }
  };
}

