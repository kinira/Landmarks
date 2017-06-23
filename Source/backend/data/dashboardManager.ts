import { db } from '../server'
import { Service } from "ts-express-decorators/lib";

@Service()

export class DashboardManager {
    private HASH_ROUNDS = 10;

    async getTopCities(){
        let res = db.session().run(
            `MATCH(city:City) with city
    	     OPTIONAL MATCH (city)<-[IS_ABOUT]-(story:Story)
             return city.name as city, count(story) as storiesAbout 
             Order by storiesAbout desc
             Limit 5`
        );
        return res;
    }
    
}