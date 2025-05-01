import express from 'express'
import { getTheaters, postTheater,getTheatersdetail,putTheater,deleteTheater} from '../../controllers/theaterController';
 import { validateRequest } from '../../middleware/validateRequest';
 import { theaterSchema } from '../../utils/zodSchema';

const theatersRoutes = express.Router();

//urutan route 
//1.routes
//2.bisa body/langsung nama function
//3 nama function

theatersRoutes.get('/theaters',getTheaters)
theatersRoutes.post('/theaters',validateRequest(theaterSchema),postTheater)
theatersRoutes.get('/theaters/:id',getTheatersdetail)
theatersRoutes.put('/theaters/:id',validateRequest(theaterSchema),putTheater)
 theatersRoutes.delete('/theaters/:id',deleteTheater)


export default theatersRoutes