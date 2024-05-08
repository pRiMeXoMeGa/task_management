import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoslistPageComponent } from './todoslist-page.component';

describe('TodoslistPageComponent', () => {
  let component: TodoslistPageComponent;
  let fixture: ComponentFixture<TodoslistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoslistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoslistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
