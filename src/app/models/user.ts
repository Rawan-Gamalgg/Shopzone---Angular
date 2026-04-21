export interface IUser{
id:number,
firstName:string,
lastName:string,
email:string,
password:string,
confirmPassword?:string;
role:'admin'|'user';
}