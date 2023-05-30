import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

interface WikipediaResponse {
  query: {
    search: Article[]
  }
}
export interface Article {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root'})
export class SearchService {
  constructor(private readonly http: HttpClient){

  }

  search(term: string ): Observable<Article[]>{
      const URL_API:string = 'https://es.wikipedia.org/w/api.php';
      const params = {
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: term,
        utf8: '1',
        origin: '*'
      }
      return this.http.get<WikipediaResponse>(URL_API, {params: params})
      .pipe(
        map(x => x?.query?.search)
      );
    }

}
