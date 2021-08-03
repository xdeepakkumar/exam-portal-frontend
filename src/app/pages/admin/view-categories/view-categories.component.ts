import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      id: 12,
      title: "Programming Section",
      description: "This is testing description"
    },
    {
      id: 54,
      title: "Aptitude Section",
      description: "This is testing description"
    }
    ,
    {
      id: 65,
      title: "Logical Reasoning Section",
      description: "This is testing description"
    }
  ];

  constructor(private _categoriesService: CategoryService) { }

  ngOnInit(): void {
    this._categoriesService.categories().subscribe(
      (data:any)=> {
        this.categories = data;
      },
      (error)=> {
        alert("no category available.....");
      }
    );
  }

}
