export class Task{
    title:string="";
    tags:string="";
    startDate:Date=null;
    endDate:Date=null;
    description:string="";
    assignedTo:Array<string>=[];
    assignedBy:string="";
    createdOn:Date=null;
    updatedBy:Date=null;
    createdBy:string="";
    isActive:boolean=true;
    isCompleted:boolean=false;
    status:string="";
}