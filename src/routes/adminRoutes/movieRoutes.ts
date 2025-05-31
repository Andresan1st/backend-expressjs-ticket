import express from 'express'
import multer from 'multer';
import { createMovie, deleteMovie, getMovies, getMoviesdetail, updateMovie } from '../../controllers/movieController';
import { imageFilter, thumbnailStorage } from '../../utils/multer';


const upload = multer({
    storage: thumbnailStorage(),fileFilter:imageFilter,
});

const movieRoutes = express.Router();

//urutan route 
//1.routes
//2.bisa body/langsung nama function
//3 nama function
movieRoutes.get('/movies',getMovies);
movieRoutes.get('/movies/:id',getMoviesdetail);
movieRoutes.post('/movies',upload.single('thumbnail'), createMovie);
movieRoutes.put('/movies/:id',upload.single('thumbnail'), updateMovie);
 movieRoutes.delete('/movies/:id',deleteMovie);

export default movieRoutes;