import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { defer, from, fromEvent } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('search') search!: ElementRef;
  
  title = 'pretest2';
  data!: string[];


  data$ = defer(()=>{
    return   this.http.get<string[]>('https://api.publicapis.org/categories');
  }).pipe(switchMap(val=>{
    return fromEvent<Event>(this.search.nativeElement ,'input').pipe(map(event=>{
      return (event.target as HTMLInputElement).value;
    }),
    map(query=>{
      return val.filter(item=>item.toLowerCase().indexOf(query) >= 0)
    }) , 
    startWith(val));
  }));
  constructor(private http : HttpClient){}
  ngAfterViewInit(){
  } 
}
