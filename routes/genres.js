const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('genres link')
    // res.render()
})

module.exports = router