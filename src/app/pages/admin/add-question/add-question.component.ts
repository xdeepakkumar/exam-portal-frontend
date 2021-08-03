import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor;


  qId:any;
  qTitle:any;
  question:any = {
    quiz: {

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }

  constructor(private _route:ActivatedRoute, private _questionService: QuestionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this.question.quiz['qId'] = this.qId;

  }

  //add
  formSubmit(){

    if(this.question.content.trim() == '' || this.question.content == null){
      this.snackBar.open("all friends are required", "ok");
      return;
    }
    this._questionService.addQuestion(this.question).subscribe(
      (data)=> {
        Swal.fire("Success", "question added successfully", "success");
      },
      (error)=> {
        Swal.fire("Error", "somethng went wrong", "error");
      }
    );
  }

}
