import { Component, Input } from '@angular/core';
import { Article } from '../search/service/search.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  @Input() article !: Article;
}
