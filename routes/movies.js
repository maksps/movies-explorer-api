const router = require('express').Router();

const { movieValidator, idValidator } = require('../middlewares/validation');
const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', movieValidator, addMovie);
router.delete('/:_id', idValidator, deleteMovie);

module.exports = router;
