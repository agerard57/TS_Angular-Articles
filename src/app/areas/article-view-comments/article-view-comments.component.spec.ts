import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewCommentsComponent } from './article-view-comments.component';

describe('ArticleViewCommentsComponent', () => {
  let component: ArticleViewCommentsComponent;
  let fixture: ComponentFixture<ArticleViewCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleViewCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleViewCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
