import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  qId:any;
  quizzes:any;
  constructor(private route: ActivatedRoute, private _quizService: QuizService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:any)=> {
        this.qId = params.catId;
        if(this.qId == 0){
          this._quizService.getActiveQuizzes().subscribe(
            (data: any) => {
              this.quizzes = data;
            },
            (error)=> {
              console.log(error);
            }
          );
        }else{
          console.log("load quiz by id");
          this._quizService.getQuizzesOfCategory(this.qId).subscribe(
            (data:any)=> {
              this.quizzes = data;
            },
            (error)=> {
              console.log(error);
            }
          );
        }
      },
      (error)=>{
        console.log("faild");
      }

    );
  }

}
