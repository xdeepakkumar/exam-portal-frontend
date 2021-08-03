import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any;


  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this._quizService.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz = data;
      },
      (error)=> {
        console.log(error);
      }
    );
  }
  startQuiz(){
      Swal.fire({
        title: 'Are you sure to start the QUIZ',
        showCancelButton: true,
        confirmButtonText: 'START',
        icon: 'info',
        cancelButtonText: 'Cancel'
      }).then((result)=> {
        if(result.isConfirmed){
          this._router.navigate(['/start-quiz/'+this.qid]);
        }else if(result.isDenied){
          Swal.fire('cancelled..', '', 'info')
        }
      })
  }
}
