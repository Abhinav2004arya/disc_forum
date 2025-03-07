const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        
        console.log('Fetched discussions:', discussions);
        res.json(discussions);
    } catch (error) {
        console.error('Error in GET /discussions:', error); 
        res.status(500).json({ message: 'Error fetching discussions' });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        console.log('Received discussion data:', req.body);
        console.log('User ID:', req.user.id); 

        const discussion = new Discussion({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            author: req.user.id
        });

        await discussion.save();
        await discussion.populate('author', 'username');

        console.log('Created discussion:', discussion); 
        res.status(201).json(discussion);
    } catch (error) {
        console.error('Error in POST /discussions:', error); 
        res.status(500).json({ message: 'Error creating discussion' });
    }
});

module.exports = router;