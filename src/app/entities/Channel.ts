
export default class Channel{
    country : string;
    name : string;
    id?: string;
    url : any;
    originalUrl : any;
    category : string;
    lang : string;
    logo : string;
    desc : string;
    shows : string;
    constructor(){
        this.name = "";
        this.country = "ar";
        this.url = "";
        this.logo = "";
        this.desc = "";
        this.originalUrl = "";
        this.shows = "";
        this.category = "news";
        this.lang = "es";
        this.shows = "";
    }

};

export class ChannelOptions{
 public languages = [
    {value: 'en', viewValue: 'english'},
    {value: 'es', viewValue: 'spanish'},
    {value: 'other', viewValue: 'other'}
  ];
  public country = [
    {value: 'ar', viewValue: 'Argentina'},
    {value: 'us', viewValue: 'United States'},
    {value: 'other', viewValue: 'other'}
  ];
  
  public genre = [
    {value: 'news', viewValue: 'News'},
    {value: 'fun', viewValue: 'Entertaiment'},
    {value: 'baby', viewValue: 'Babies'},
    {value: 'other', viewValue: 'other'}
  ];

}