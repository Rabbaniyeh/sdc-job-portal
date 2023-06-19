import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEducation } from '../../../../models/resume.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  @Input() heading: string = '';
  public dummyEducationData: IEducation = {
    instituteName: '',
    major: '',
    marks: '',
    start: '',
    end: ''
  };
  public educationData: Array<IEducation> = [
    {
      instituteName: '',
      major: '',
      marks: '',
      start: '',
      end: ''
    }
  ];

  constructor(private http: HttpClient) {}

  public addNewFields(): void {
    this.educationData.push(JSON.parse(JSON.stringify(this.dummyEducationData)));
  }

  public deleteEducationItem(index: number): void {
    this.educationData.splice(index, 1);
  }

  public saveAndNext(): void {
    for (const educationItem of this.educationData) {
      const educationDetail = {
        profileId:localStorage.getItem('profileID'),
        institute: educationItem.instituteName,
        major: educationItem.major,
        marks: educationItem.marks,
        start: educationItem.start,
        end: educationItem.end
      };

      this.http.post('http://rabbaniyeh-001-site1.atempurl.com/api/Profile/AddEducationDetails', educationDetail).subscribe(
        (res) => {
          // Handle success response
          console.log(res);
        },
        (err) => {
          // Handle error response
          console.error(err);
        }
      );
    }
  }
}
