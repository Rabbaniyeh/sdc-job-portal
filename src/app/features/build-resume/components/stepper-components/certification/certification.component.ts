import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICertification } from '../../../../models/resume.model';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent {
  @Input() heading: string = '';
  public dummyCertificationData: ICertification = {
    certificationName: '',
    certificationFrom: '',
    year: ''
  };
  public certificationData: Array<ICertification> = [
    {
      certificationName: '',
      certificationFrom: '',
      year: ''
    }
  ];

  constructor(private http: HttpClient) {}

  public addNewFields(): void {
    this.certificationData.push(JSON.parse(JSON.stringify(this.dummyCertificationData)));
  }

  public deleteCertificationItem(index: number): void {
    this.certificationData.splice(index, 1);
  }

  public saveAndNext(): void {
    for (const certificationItem of this.certificationData) {
      const certificationDetail = {
        profileId: localStorage.getItem('profileID'),
        name: certificationItem.certificationName,
        organization: certificationItem.certificationFrom,
        end: certificationItem.year
      };

      this.http.post('http://rabbaniyeh-001-site1.atempurl.com/api/Profile/AddCertificationDetails', certificationDetail).subscribe(
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
