import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Movies} from '../movies/movies';
import {TVShows} from '../tvshows/tvshows';
import {Service} from '../service';
import {TranslateService} from '@ngx-translate/core';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  movies: Movies[];
  tvshows: TVShows[];

  constructor(private service: Service, private translateService: TranslateService) {
  }

  @HostBinding('class') class = 'my-auto col-12';

  public ngOnInit(): void {
    this.movies = [];
    this.service
      .getListOfGroup(`https://api.themoviedb.org/3/movie/popular?api_key=ccbc42c4b357545c785bb0d1caba6301&language=${this.translateService.currentLang}&page=1`)
      .subscribe(
        data => {
          for (const movie of data.results.slice(0, 10)) {
            this.movies.push(plainToClass(Movies, movie));
          }
        },
        err => {
          console.log(err);
        }
      );
    this.tvshows = [];
    this.service
      .getListOfGroup(`https://api.themoviedb.org/3/tv/popular?api_key=ccbc42c4b357545c785bb0d1caba6301&language=${this.translateService.currentLang}&page=1`)
      .subscribe(
        data => {
          for (const tvshow of data.results.slice(0, 10)) {
            this.tvshows.push(plainToClass(TVShows, tvshow));
          }
        },
        err => {
          console.log(err);
        }
      );
  }

}
