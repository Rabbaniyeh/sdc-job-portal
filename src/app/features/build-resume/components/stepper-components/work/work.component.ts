import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWork } from '../../../../models/resume.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  @Input() heading: string = '';
  public dummyWorkData: IWork = {
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    startYear: '',
    endYear: ''
  };
  public workData: Array<IWork> = [
    {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      startYear: '',
      endYear: ''
    }
  ];

  constructor(private http: HttpClient) {}

  public addNewFields(): void {
    this.workData.push(JSON.parse(JSON.stringify(this.dummyWorkData)));
  }

  public deleteWorkItem(index: number): void {
    this.workData.splice(index, 1);
  }

  public saveAndNext(): void {
    for (const workItem of this.workData) {
      const workDetail = {
        profileId: localStorage.getItem('profileID'),
        organization: workItem.companyName,
        jobRole: workItem.jobTitle,
        jobDescription: workItem.jobDescription,
        start: workItem.startYear,
        end: workItem.endYear
      };

      this.http.post('http://rabbaniyeh-001-site1.atempurl.com/api/Profile/AddWorkDetails', workDetail).subscribe(
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
