import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  public Editor = ClassicEditor;

  categories:any =  [];

  quizData = {
      title: '',
      desciption : '',
      maxMarks: '',
      numberOfQuestions: '',
      active: true,
      category: {
        cid: ''
      }
    }



  constructor(private _categoryService: CategoryService, private snackBar: MatSnackBar, private _quizService: QuizService) { }

  ngOnInit(): void {
    this._categoryService.categories().subscribe(
      (data:any)=> {
        this.categories = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  addQuiz(){
    //validation
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this.snackBar.open("all fields are required", "ok");
    }
    //adding
    this._quizService.addQuiz(this.quizData).subscribe(
      (data)=> {
        Swal.fire("Added successfully", "quiz has been added successfully..", "success");
      },
      (error)=>{
        Swal.fire("failed", "Error!! something went wrong.", "error");
      }
    );

  }
}
