import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any = [];

  constructor(private route: ActivatedRoute, private _questionService: QuestionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.id;
    this.qTitle = this.route.snapshot.params.title;
    this._questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=> {
        console.log(data);
        this.questions = data;
      },
      (error)=> {
        console.log(error);
      }
    );
  }
  //delete
public deleteQuestion(quesId:any){
  Swal.fire({
    icon: 'info',
    title: 'Are You Sure to delete?',
    confirmButtonText: 'Delete',
    showCancelButton: true
  }).then((result) => {
    if(result.isConfirmed){
      this._questionService.deleteQuestion(quesId).subscribe(
        (data)=> {
          this.snackBar.open("quiz deleted successfully", "ok");
          this.questions = this.questions.filter((q: { quesId: any; })=> q.quesId != quesId);
        },
        (error)=> {
          this.snackBar.open("quiz deletion faild", "ok");
        }
      );
    }
  });
}
}
