import { db } from '../server'
import { Service } from "ts-express-decorators/lib";
import { Route } from '../models/Route';
import { PPosition } from '../models/PPosition';


@Service()

export class RouteManager {
    private HASH_ROUNDS = 10;

    async insertRoutsAsync(newRoute : Route){
        let res = await db.session().run(
             `Create(n:Route {name:{routeName}})with n
                match (u:User) WHERE u.username = {user}
                match(c:City) where c.name = {town}
                create (u)-[:ADDED_ROUTE]->(n)
                create (n)-[:FOR_CITY]-> (c)  REturn id(n)`, 
            {routeName : newRoute.name, user : newRoute.username, 
             town : newRoute.city
            }
        );

      
        newRoute.waypoints.forEach(route => {
             db.session().run(
             `Match(n:Route) where id(n) = {idRoute}
            Create(w1:Waypoint {lng: {LNG},lat:{LAT}) 
               Create (n)-[:INCLUDES]->(w1)`, 
            {idRoute : res, LNG : route.lng, LAT : route.lat}
        )});
        }

    }