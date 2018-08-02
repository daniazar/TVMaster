
export default class Channel{
    country : string;
    name : string;
    id?: string;
    url : any;
    originalUrl : any;
  
    logo : string;
    desc : string;
    constructor(){
        this.name = "";
        this.country = "";
        this.url = "";
        this.logo = "";
        this.desc = "";
        this.originalUrl = "";
    }

};