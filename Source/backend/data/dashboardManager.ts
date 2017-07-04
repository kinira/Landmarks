import { db } from '../server'
import { Service } from "ts-express-decorators/lib";



export class DashboardItem{
    constructor(private city: String, private storiesAbout : Number) { }
}

@Service()
export class DashboardManager {   

    async getTopCities(){
        let res = await db.session().run(
            `MATCH(city:City) with city
    	     OPTIONAL MATCH (city)<-[IS_ABOUT]-(story:Story)
             return city.name as city, count(story) as storiesAbout 
             Order by storiesAbout desc
             Limit 5`, {}
        );
        let data = res.records.map(rec => new DashboardItem(rec.get('city'), rec.get('storiesAbout').toNumber()));
        return data;
    }
    
}