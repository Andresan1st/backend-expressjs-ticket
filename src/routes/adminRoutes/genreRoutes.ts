import express from 'express'
import { getGenres, postGenre, putGenre,deleteGenre,getGenresdetail} from '../../controllers/genreController';
import { validateRequest } from '../../middleware/validateRequest';
import { genreSchema } from '../../utils/zodSchema';

const genreRoutes = express.Router();

//urutan route 
//1.routes
//2.bisa body/langsung nama function
//3 nama function
genreRoutes.get('/genres',getGenres)
genreRoutes.get('/genres/:id',getGenresdetail)
genreRoutes.post('/genres',validateRequest(genreSchema),postGenre)
genreRoutes.put('/genres/:id',validateRequest(genreSchema),putGenre)
genreRoutes.delete('/genres/:id',deleteGenre)

export default genreRoutes