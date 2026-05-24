import { supabase } from '../config/supabase.js';

// REGISTRO
export const register = async (req, res) => {

  try {

    const {
      full_name,
      age,
      salary,
      email,
      password
    } = req.body;

    // VALIDACIONES
    if (
      !full_name ||
      !age ||
      !salary ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    // REGISTRO SUPABASE AUTH
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          age,
          salary
        }
      }
    });

    // ERROR
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // RESPUESTA
    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente. Verifique su correo.',
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// LOGIN

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // VALIDACIONES
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña requeridos'
      });
    }

    // LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    // ERROR
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    // RESPUESTA
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// LOGIN GOOGLE

export const loginWithGoogle = async (req, res) => {

  try {

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/dashboard'
      }
    });

    // ERROR
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // RESPUESTA
    return res.status(200).json({
      success: true,
      url: data.url
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// MOSTRAR PERFIL

export const getProfile = async (req, res) => {

  try {

    return res.status(200).json({
      success: true,
      user: req.user
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ACTUALIZAR PERFIL

export const updateProfile = async (req, res) => {

  try {

    const {
      full_name,
      age,
      salary
    } = req.body;

    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name,
        age,
        salary
      }
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil actualizado correctamente',
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// RECUPERAR CONTRASEÑA

export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requerido'
      });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: 'http://localhost:5173/update-password'
      }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Correo de recuperación enviado'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ACTUALIZAR CONTRASEÑA

export const updatePassword = async (req, res) => {

  try {

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Nueva contraseña requerida'
      });
    }

    const { data, error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contraseña actualizada correctamente',
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};