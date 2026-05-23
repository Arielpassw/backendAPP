import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Ruta auth funcionando'
  });
});

export default router;