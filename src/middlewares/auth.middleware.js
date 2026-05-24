import { supabase } from '../config/supabase.js';

export const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token requerido'
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    req.user = data.user;

    next();

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};