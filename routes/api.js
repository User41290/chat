var express = require('express');
var router = express.Router();
var _ = require('underscore');


router.use(function(req,res, next){
	var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
	res.setHeader('Content-Type', 'application/json');
	res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
	next();
});


router.post('/login', function(req, res) {
	console.log("--- Login API ---");
	console.log(req.body);
	
	login_api.login_account(req, res);
});

router.post('/login/default', function(req, res) {
	console.log("--- Default Login API ---");
	console.log(req.body);
	
	login_api.check_access_token(req, res);
});


router.post('/avatar/update', function(req, res) {
	console.log("--- Update Avatar API ---");
	console.log(req.body);
	action_api.update_avatar(req, res);
});

router.post('/player/getPlayerInfo', function(req, res) {
	console.log("--- Get Player Info API ---");
	console.log(req.body);
	action_api.get_player_info(req, res);
	
});

router.post('/signup', function(req, res) {
	console.log("--- Sign up API ---");
	console.log(req.body);
	signup_api.create_player(req, res);
	
});

router.get('/ll', function(req, res) {
	res.send("ahhahahha");
});

router.get('/decks/getAll', function(req, res) {
	console.log("--- Deck Get All API ---");
	console.log(req.params);
	decks_api.get_all_decks(req, res);
});

router.post('/decks/setPreferences', function(req, res) {
	console.log("--- Deck Set Preferences API ---");
	console.log(req.body);
	decks_api.set_deck_preferences(req, res);
});

router.post('/decks/getPreferences', function(req, res) {
	console.log("--- Deck Get Preferences API ---");
	console.log(req.body);
	decks_api.get_deck_preferences(req, res);
});

router.post('/decks/levelUp', function(req, res) {
	console.log("--- Deck Level Up API ---");
	console.log(req.body);
	decks_api.deck_level_up(req, res);
});

router.post('/bonus/daily/check', function(req, res) {
	console.log("--- Check Daily Bonus API ---");
	console.log(req.body);
	daily_bonus_api.check_daily_bonus(req, res);
});

router.post('/bonus/daily/claim', function(req, res) {
	console.log("--- Claim Daily Bonus API ---");
	console.log(req.body);
	daily_bonus_api.claim_daily_bonus(req, res);
});

router.post('/password/update', function(req, res) {
	console.log("--- Update/Change Password API ---");
	console.log(req.body);
	password_api.change_password(req, res);
});

router.post('/password/forgot', function(req, res) {
	console.log("--- Forgot Password API ---");
	console.log(req.body);
	password_api.forgot_password(req, res);
});

//get_player_reward
router.post('/reward/getAll', function(req, res) {
	console.log("--- Get Player all rewards API ---");
	console.log(req.body);
	reward_api.get_player_reward(req, res);
});

// start reward countdown
router.post('/reward/start', function(req, res) {
	console.log("--- Start player reward countdown API ---");
	console.log(req.body);
	reward_api.start_countdown_player_reward(req, res);
});

//claim player reward
router.post('/reward/claim', function(req, res) {
	console.log("--- Claim player reward API ---");
	console.log(req.body);
	reward_api.claim_player_reward(req, res);
});

// facebook signup/ login
router.post('/facebook/signup_login', function(req, res) {
	console.log("--- Facebook Sign Up / Login API ---");
	console.log(req.body);
	facebook_api.fb_signup_login(req, res);
});

module.exports = router;