import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReponseComponent } from './add-reponse.component';

describe('AddReponseComponent', () => {
  let component: AddReponseComponent;
  let fixture: ComponentFixture<AddReponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReponseComponent]
    });
    fixture = TestBed.createComponent(AddReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
