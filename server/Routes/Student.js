import express from 'express';
import {get_programs ,get_dec,get_sem, get_sec} from '../Controller/student.js';

const router = express.Router();
router.get('/programs', get_programs);
router.get('/dec/:id', get_dec);
router.get('/get_sem',get_sem);
router.get('/get_sec',get_sec);
export default router;