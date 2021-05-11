import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  showAddTask$ = this.uiService.showAddTask();

  form = new FormGroup({
    text: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    day: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    reminder: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
  });

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((v) => console.log(v));
  }

  async onSubmit() {
    console.log(1111111);
    if (!this.form.valid) {
      return;
    }

    console.log(222222222);
  }
}
