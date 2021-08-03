
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _quizService: QuizService, private _cateGoryService: CategoryService, private router: Router) { }

  qId = 0;
  quiz:any;
  categories: any;

  ngOnInit(): void {
    this.qId = this._activatedRoute.snapshot.params.qid;
    this._quizService.getQuiz(this.qId).subscribe(
      (data:any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=> {
        console.log(error);
      }
    );

    //categories
    this._cateGoryService.categories().subscribe(
      (data:any)=> {
        this.categories = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }
   //upadte
  public submitForm(){
    this._quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire("Success", "updating quiz is successfull..", "success").then((e) => {
          this.router.navigate(['/admin-dashboard/quizzes'])
        })
      },
      (error)=>{
        Swal.fire("failed", "updating quiz is successfull..", "error");
      }
    );
  }

}
