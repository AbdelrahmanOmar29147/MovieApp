import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MoviesService } from '../../services/movies.service';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateService, TranslateStore } from '@ngx-translate/core';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent, PaginatorComponent],
      imports: [SharedModule],
      providers: [
        TranslateService,
        TranslateStore,
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();

    moviesService = TestBed.inject(MoviesService);
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('MoviesService fetches top rated correctly', (done: DoneFn) => {
    moviesService.getMovies(component.currentPage).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.results.length).toBe(20);
      expect(component.moviesList).toEqual(data.results);
      done();
    });
  });
});
