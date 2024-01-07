import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { RouterTestingModule } from '@angular/router/testing';

import {
  TranslateService,
  TranslateStore,
  TranslateLoader,
} from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '../../../../../shared/shared.module';
import { MoviesService } from '../../../../services/movies.service';
import { MoviesMockData } from '../../../../models/movies';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;
  const mockMoviesData = MoviesMockData;

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj('MoviesService', ['getMovies']);

    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      providers: [TranslateService, TranslateStore, TranslateLoader],
    }).compileComponents();

    mockMoviesService.getMovies.and.returnValue(of(mockMoviesData));
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a movie correctly', (done: DoneFn) => {
    let compiled;
    mockMoviesService.getMovies(1).subscribe((data) => {
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
