module.exports = function(app, passport) {

//TODO:
//=====:update the routes to actually use flash to display errors

	app.get('/', function(req, res) {
		res.render('index.ejs'); 
	});

	app.get('/login', function(req, res) {

		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));


	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup', 
		failureFlash : true 
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user 
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
    return next();

	res.redirect('/');
}