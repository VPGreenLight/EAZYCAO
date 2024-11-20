import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private keywordSource = new BehaviorSubject<string>('');
  keyword$ = this.keywordSource.asObservable();

  updateKeyword(newKeyword: string): void {
    this.keywordSource.next(newKeyword);
  }
}