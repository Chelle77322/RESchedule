const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
	try {
		res.render('homepage');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/employee/:id', async (req, res) => {
	try {
		const employeeData = await Employee.findByPk(req.params.id, {
			include: [
				{
					model: Task,
					attributes: ['title', 'time', 'length'],
				},
			],
		});

		const employee = employeeData.get({ plain: true });

		res.render('employee', {
			...employee,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Post }],
		});

		const user = userData.get({ plain: true });

		res.render('dashboard', {
			...user,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

module.exports = router;
