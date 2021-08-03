import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category={
    title:'',
    description: ''
  }

  constructor(private _categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){


    if(this.category.title.trim() == '' || this.category.description == null){
      this.snackBar.open("all fields are requied" , "ok");
      return;
    }

    this._categoryService.addCategory(this.category).subscribe(
      (data)=> {
        this.category.description='';
        this.category.title = '';
        Swal.fire("Success", "category added", 'success');
      },
      (error)=> {
        this.snackBar.open("something went wrong", "ok");
      }
    );
  }
}
