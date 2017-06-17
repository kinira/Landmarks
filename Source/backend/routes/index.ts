import { Request, Response, Router, NextFunction } from 'express';
import { default as userManager } from '../data/userManager';
import { default as authModule } from '../modules/auth';

var router = Router();


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    //var createRes = await userManager.createUser("kalin", "Test123!");
    var findRes = await userManager.findUser("kalin");
    var checkPassword = await userManager.verifyLogin("kalin", "Test123!");
    res.json({ "title": "index", "text": "hello there!" })
  } catch (error) {
    res.status(500);  
    res.json(`Could not create user | ${error}`);
  }
});


router.post('/login', async (req, res) => {
  try {
    var user = await userManager.verifyLogin(req.body.username, req.body.password);
    var token = await authModule.signIn(user);
    res.header("Authorization", `Bearer ${token}`);
    res.json({ "success": true });
  } catch (error) {
    res.status(400);
    res.json({ "success": false });
  }

});

router.get('/protected', authModule.isAuthorized, (req, res) => {
  res.json({ "success": true, "message": "you have succesfully accessed protected resource" });
})


export { router };
