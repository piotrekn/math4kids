import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'math4kids';
  private generatedProblems: Set<string> = new Set();
  protected currentProblem = this.generateAdditionProblem();
  protected userAnswer!: number | null;
  protected showOverlay = false;

  generateAdditionProblem(): { text: string, result: number } {
    let a: number, b: number, problem: string;
    do {
      a = Math.floor(Math.random() * 10);
      b = Math.floor(Math.random() * 10);
      problem = `${a} + ${b} = ?`;
    } while (this.generatedProblems.has(problem));

    this.generatedProblems.add(problem);
    return { text: problem, result: a + b };
  }

  checkAnswer() {
    if (this.userAnswer === this.currentProblem.result) {
      this.showOverlay = true;
      setTimeout(() => this.hideOverlay(), 1000); // Hide overlay after 1 second
    } else {
      alert('Try again!');
    }
  }

  hideOverlay() {
    this.showOverlay = false;
    this.currentProblem = this.generateAdditionProblem();
    this.userAnswer = null;
  }
}
