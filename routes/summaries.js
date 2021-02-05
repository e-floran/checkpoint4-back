const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.post('/', (req, res) => {
    const {eventReference, eventDate, eventTitle, eventText} = req.body;
    pool.query(
        'INSERT INTO summaries (eventReference, eventDate, eventTitle, eventText) VALUES(?,?,?,?)',
        [eventReference, eventDate, eventTitle, eventText],
        (err, status) => {
          if (err) {
            res.status(500).json({error: err.message});
          } else {
            const insertedSummary = {
              id: status.insertId,
              eventReference: eventReference,
              eventDate: eventDate,
              eventTitle: eventTitle,
              eventText: eventText
            };
            res.status(201).json(insertedSummary);
          }
        },
    );
});

router.get('/', (req, res) => {
  pool.query('SELECT * FROM summaries', (err, summaries) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else if (summaries.length === 0) {
        res.status(404).json({error: 'There seems to be no summary registered for now.'});
      } else {
        res.status(200).json(summaries);
      }
    },
  );
});

router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM summaries WHERE id = ?', [req.params.id], (err, summaries) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else if (summaries.length === 0) {
        res.status(404).json({error: 'This summary has not been created yet.'});
      } else {
        res.json(summaries[0]);
      }
    },
  );
});

module.exports = router;