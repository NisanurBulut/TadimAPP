import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class LoggingService  {
    lastLog:string;
    printLog(message:string){
        this.lastLog=message;
        console.log(message);
    }
}
