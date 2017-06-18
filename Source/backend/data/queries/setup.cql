
CREATE CONSTRAINT ON (u:User) ASSERT u.username IS UNIQUE;

CREATE (adm:User {username:"admin", password : "$2a$10$pST/HuB.asBeBLL4EQZ5eOEdlkf4/.PS3TbE1Nu3dbPHW0Dh99Q82" }),
       (kalin:User {username:"kalin", password : "$2a$10$pST/HuB.asBeBLL4EQZ5eOEdlkf4/.PS3TbE1Nu3dbPHW0Dh99Q82"})


// Add a message from kalin to admin:
MATCH (k: User) WHERE k.username = "kalin"
MATCH (adm: User) WHERE adm.username = "admin"
CREATE (k)-[:MESSAGED { date: "18-07-2017", text: "Hello admin!"  }]->(adm)


// Add a City
CREATE (sf:City {name:"Sofia" })

// Add waypoints (if they do not exist) to create a route
MERGE       (w1: WayPoint { lat: 123, lng: 123 })
MERGE       (w2: WayPoint { lat: 124, lng: 123 })
MERGE       (w3: WayPoint { lat: 125, lng: 123 })
MERGE       (w4: WayPoint { lat: 127, lng: 123 })
WITH w1,w2,w3,w4

// Get the person creating the route and the city to which it's related
MATCH  (k: User) WHERE k.username = "kalin"
MATCH  (sf:City) WHERE sf.name = "Sofia"

// Add the relationships
CREATE (r1:Route { name : "firstRoute"}),
    (r1)-[:INCLUDES {order: 1} ]->(w1),
    (r1)-[:INCLUDES {order: 2} ]->(w2),
    (r1)-[:INCLUDES {order: 3} ]->(w3),
    (r1)-[:INCLUDES {order: 4} ]->(w4)

CREATE (k)-[:ADDED_ROUTE { date: "18-07-2017" }]->(r1),
       (r1)-[:FOR_CITY]->(sf)



// GET cities, with optionally their routes
MATCH (c:City)
OPTIONAL MATCH (route)-[:FOR_CITY]-(c)
RETURN c, route

// landmarks-app
// b.XdP0XkwTWdXS.aUbTQSm9MYCmllpy