import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MoviesService } from '../../services/movies.service';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesMockData } from '../../models/movies';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;
  const mockMoviesData = MoviesMockData;

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj('MoviesService', ['getMovies']);

    await TestBed.configureTestingModule({
      declarations: [CatalogComponent, PaginatorComponent, MovieComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { MoviesService, useValue: mockMoviesService },
        TranslateService,
        TranslateStore,
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();

    TestBed.overrideProvider(MoviesService, { useValue: mockMoviesService });
    mockMoviesService.getMovies.and.returnValue(of(mockMoviesData));
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch from MoviesService correctly', () => {
    mockMoviesService.getMovies(1).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.results.length).toBe(3);
      expect(component.moviesList).toEqual(data.results);
    });
  });

  it('should render movies correctly', () => {
    const compiled = fixture.debugElement;
    const movieElements = compiled.queryAll(By.css('.movie-test'));
    expect(movieElements.length).toBe(3);
  });
});
