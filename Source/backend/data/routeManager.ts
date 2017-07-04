import { db } from '../server'
import { Service } from "ts-express-decorators/lib";
import { Route } from '../models/Route';
import { PPosition } from '../models/PPosition';
import { BadRequest } from 'ts-httpexceptions';

@Service()

export class RouteManager {
    private HASH_ROUNDS = 10;

    // Generates a pseudo random unique id
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    async insertRoutsAsync(newRoute: Route) {
        try {

            var uuid = this.uuidv4();
            newRoute.name = `${newRoute.city}_${newRoute.username}_${uuid}`

            let res = await db.session().run(
                `Create(n:Route {name:{routeName}, summary: {summary}, description: {description}}) with n
                match (u:User) WHERE u.username = {user}
                match(c:City) where c.name = {town}
                create (u)-[:ADDED_ROUTE]->(n)
                create (n)-[:FOR_CITY]->(c) 
                Return id(n) as id`,
                {
                    routeName: newRoute.name, user: newRoute.username,
                    town: newRoute.city,
                    summary: newRoute.summary,
                    description: newRoute.description
                }
            );

            let routeId = res.records[0].get('id');

            for (var i = 0; i < newRoute.waypoints.length; i++) {
                var wayPoint = newRoute.waypoints[i];

                await db.session().run(
                    `Match(n:Route) where id(n) = {idRoute}
                     Create(w1:Waypoint {lng:{LNG},lat:{LAT}}) 
                     Create (n)-[:INCLUDES { order: {order}}]->(w1)`,
                    { idRoute: routeId, LNG: wayPoint.lng, LAT: wayPoint.lat, order: i });
            }
        } catch (error) {
            throw new BadRequest('Could not insert route');
        }
    }

    async getRoutesAsync(city: string) {
        let allStories = await db.session().run(
            `MATCH (r:Route)-[rc:FOR_CITY]-(c:City) 
             MATCH (r)-[:ADDED_ROUTE]-(u:User)
             MATCH (r)-[:INCLUDES]-(w:Waypoint)
             WHERE c.name = {city}
             return r.name, r.summary, r.description, id(r) as id, w.lat, w.lng, u.username`, { city: city }
        );

        var grouped = {};

        allStories.records.forEach(rec => {
            var id = rec.get('id').toNumber();
            if (!grouped[id]) {
                grouped[id] = new Route(rec.get('r.name'), rec.get('u.username'), city,
                    rec.get('r.summary'), rec.get('r.description'), [], id);
            }

            grouped[id].waypoints.push(new PPosition(rec.get('w.lng'), rec.get('w.lat')))
        });

        return grouped;
    }

    async getRoute(id: number) {
        let allStories = await db.session().run(
            `MATCH (r:Route)-[rc:FOR_CITY]-(c:City) 
             MATCH (r)-[:ADDED_ROUTE]-(u:User)
             MATCH (r)-[:INCLUDES]-(w:Waypoint)
             WHERE id(r) = {id}
             return r.name, r.summary, r.description, id(r) as id, w.lat, w.lng, u.username, c.name as city`, { id: id }
        );

        var firstRec = allStories.records[0];
        var result = new Route(firstRec.get('r.name'), firstRec.get('u.username'), firstRec.get('city'),
            firstRec.get('r.summary'), firstRec.get('r.description'), [], id);

        allStories.records.forEach(rec => {
            result.waypoints.push(new PPosition(rec.get('w.lng'), rec.get('w.lat')))
        });

        return result;
    }

}