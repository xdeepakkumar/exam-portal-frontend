import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any= [];

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this._quizService.quizzes().subscribe(
      (data) => {
        this.quizzes = data;
        console.log(data);
      },
      (error)=> {
        console.log(error);
      }
    );
  }

  //delete quiz
  public deleteQuiz(qId:any){
    Swal.fire({
      icon: 'error',
      title: 'Are You Sure to delete?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if(result.isConfirmed){
        this._quizService.deleteQuiz(qId).subscribe(
          (data)=> {
            this.quizzes = this.quizzes.filter((quiz:any) => quiz.qId != qId)
            Swal.fire("Deleted", "quiz deleted successfully", "success");
          },
          (error)=> {
            Swal.fire("Failed", "quiz deletion faild", "error");
          }
        );
      }
    })
  }
}
