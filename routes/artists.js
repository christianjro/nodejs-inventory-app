const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('artists link')
    // res.render()
})

module.exports = router