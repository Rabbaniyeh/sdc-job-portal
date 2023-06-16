import { Component, Input } from '@angular/core';
import { IPersonal } from '../../../../models/resume.model';
import { BuildResumeService } from '../../../services/build-resume.service';
import { IDepartment } from 'src/app/features/models/api.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {
  @Input() heading: string = '';
  public imageUrl: string = '';
  public isFormLoaded: boolean = false;
  public declare allDepartments: IDepartment[];
  public isLoading: boolean = false;
  public personalData: IPersonal = {
    Email: '',
    Registration: '',
    Address: '',
    DepartmentId: 1000,
    Phone: '',
    LinkedIn: '',
    Website: '',
    Summary: ''
  }

  public declare image: File;

  constructor(
    private buildResume: BuildResumeService
  ) {}

  ngOnInit(): void {
  this.getAllDepartments()
  }

  public async onImageUpload(event: any): Promise<void> {
    this.image = event.target.files[0]
    this.convertFileToBinaryString()
    this.imageUrl = await this.readFileUrl(this.image)
  }

  public uploadImage(): void {
    //Upload image logic
  }

  public savePersonalData() {
    this.isLoading = true;
    this.buildResume.postPersonalData(this.personalData).subscribe(res => this.isLoading = false, err => this.isLoading = false);
  }

  private readFileUrl(file: File): Promise<string> {
      return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = (e: any) => res(e.target.result);
          reader.onerror = (e: any) => rej(e);
          reader.readAsDataURL(file);
      });
  } 
  
  private getAllDepartments(): Array<IDepartment> {
    let departments: Array<IDepartment> = [];
    this.buildResume.getAllDepartments().subscribe((departments: Array<IDepartment>) => {
     this.allDepartments = departments;
     this.isFormLoaded = true;
    });
    return departments;
  }

  private convertFileToBinaryString() {
    const reader = new FileReader();
    reader.onloadend = () => {
      const binaryString = reader.result as string;
      this.personalData.File = binaryString;
      console.log(binaryString); // You can do further processing with the binary string
    };
    reader.readAsBinaryString(this.image);
  }
}
