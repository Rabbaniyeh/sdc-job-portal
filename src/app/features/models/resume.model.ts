export interface IResume {
    personalInformation: IPersonal;
    education: Array<IEducation>;
    work: Array<IWork>;
    skills: Array<ISkill>;
    certifications: Array<ICertification>;
    awards: Array<IAwards>;
    references: Array<IReferences>;
}

export interface IPersonal {
    Email: string;
    Registration: string;
    Address: string;
    Phone: string;
    DepartmentId: Number;
    LinkedIn?: string;
    Website?: string;
    Summary: string;
    File?: string;
}

export interface IEducation {
    instituteName: string;
    major: string;
    marks: string;
    startYear: string;
    endYear: string;
}

export interface IWork {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    startYear: string;
    endYear: string;
}

export interface ISkill {
    skillName: string;
}

export interface ICertification {
    certificationName: string;
    certificationFrom: string;
    year: string;
}

export interface IAwards {
    awardName: string;
    description: string;
}

export interface IReferences {
    name: string;
    phoneNumber: string;
    email: string;
}