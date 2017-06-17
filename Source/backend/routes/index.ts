import { Request, Response, Router, NextFunction } from 'express';
import { db } from "../app";
var router = Router();

function createSomeData() {
  // Create a session to run Cypher statements in.
  // Note: Always make sure to close sessions when you are done using them!
  var session = db.session();

  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run('MERGE (alice:Person {name : {nameParam} }) RETURN alice.name AS name', { nameParam: 'Alice' })
    .subscribe({
      onNext: function (record) {
        console.log(record.get('name'));
      },
      onCompleted: function () {
        session.close();
      },
      onError: function (error) {
        console.log(error);
      }
    });

  // or
  // the Promise way, where the complete result is collected before we act on it:
  session
    .run('MERGE (james:Person {name : {nameParam} }) RETURN james.name AS name', { nameParam: 'James' })
    .then(function (result) {
      result.records.forEach(function (record) {
        console.log(record.get('name'));
        console.log(result.summary.counters.indexesAdded());
        console.log(result.summary.resultAvailableAfter.low);
      });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
}


/* GET home page. */
router.get('/', function (req, res, next) {
  createSomeData();

  res.json({ "title": "index", "text": "hello there!" })
});

export { router };
