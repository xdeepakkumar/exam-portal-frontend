import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid:any;
  questions:any;
  isSubmitted = false;
  timer:any;

  marksGot = 0;
  correctAnswers = 0;
  totalAttempted = 0;

  constructor(private _locationStr:LocationStrategy, private _route: ActivatedRoute, private _questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();

  }

  preventBackButton(){
    history.pushState(null, '' , location.href);
    this._locationStr.onPopState(()=> {
      history.pushState(null, '' , location.href);
    });

  }
  loadQuestions(){
    this._questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //
  submitQuiz(){
    Swal.fire({
      title: 'Are you sure to Submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Yes Submit',
      icon: 'info',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if(result.isConfirmed){
        this.evalQuiz()
      }
    })
  }
  startTimer(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60)
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }

  evalQuiz(){
    //call server to check questions
    this._questionService.evalQuiz(this.questions).subscribe(
      (data:any)=> {
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.totalAttempted = data.attempted;
        this.isSubmitted = true;
      },
      (error)=> {
        console.log(error);
      }
    );
  }
  printPage(){
    window.print();
  }
}
