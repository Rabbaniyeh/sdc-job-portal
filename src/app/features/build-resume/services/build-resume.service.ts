import { Injectable } from '@angular/core';
import { IDepartment } from '../../models/api.model';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/core/urls.const';
import { Observable } from 'rxjs';
import { IPersonal } from '../../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class BuildResumeService {

  constructor(private http: HttpClient) { }

  public getAllDepartments(): Observable<Array<IDepartment>> {
    return this.http.get<Array<IDepartment>>(baseUrl + 'Department/GetAllDepartments')
  }

  public postPersonalData(personalData: IPersonal) {
    return this.http.post<Array<IPersonal>>(baseUrl + 'Profile/AddPersonalInfo', personalData)
  }
}
