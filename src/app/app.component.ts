import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenteredBoxComponent } from './centered-box/centered-box.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CenteredBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Euclidean-TSP-Solver';
}
