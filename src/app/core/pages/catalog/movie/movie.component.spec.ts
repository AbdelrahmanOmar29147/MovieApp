import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { CoreModule } from '../../../core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesService } from '../../../services/movies.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [CoreModule, RouterTestingModule],
      providers: [MoviesService],
    }).compileComponents();

    moviesService = TestBed.inject(MoviesService);
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a movie correctly', (done: DoneFn) => {
    let compiled;
    moviesService.getTopMovies(1).subscribe((data) => {
      component.movie = data.results[0];
      fixture.detectChanges();
      compiled = fixture.nativeElement;
      expect(compiled.querySelector('.movie-title').textContent).toEqual(
        'The Shawshank Redemption'
      );
      done();
    });
  });
});
