import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private _cateGoryService: CategoryService) { }
  categories:any;
  ngOnInit(): void {
    this._cateGoryService.categories().subscribe(
      (data:any)=> {
        this.categories = data;
      },
      (error)=> {
        console.log(error);
      }
    );
  }

}
