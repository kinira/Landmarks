CREATE (adm:User {name:"Admin", password : "Test123" }),
       (test:User {name:"Tester", password : "Test123"})

CREATE CONSTRAINT ON (u:User) ASSERT u.name IS UNIQUE;

CREATE (sf:City {name:"Sofia", Id : "123" })


Create (w1: WayPoint { lat: 123, lng: 123 }),
       (w2: WayPoint { lat: 124, lng: 123 }),
       (w3: WayPoint { lat: 125, lng: 123 }),
       (w4: WayPoint { lat: 127, lng: 123 }),

 (r1:Route { name : "firstRoute"}),
    (r1)-[:INCLUDES {order: 1} ]->(w1),
    (r1)-[:INCLUDES {order: 2} ]->(w2),
    (r1)-[:INCLUDES {order: 3} ]->(w3),
    (r1)-[:INCLUDES {order: 4} ]->(w4)


// landmarks-app
// b.XdP0XkwTWdXS.aUbTQSm9MYCmllpy