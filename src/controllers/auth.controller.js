import { supabase } from '../config/supabase.js';

// REGISTRO

export const register = async (req, res) => {

  try {

    const {
      first_name,
      last_name,
      age,
      salary,
      children_count,
      pets_count,
      email,
      password
    } = req.body;

    // VALIDACIONES
    if (
      !first_name ||
      !last_name ||
      !age ||
      !salary ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios deben ser completados'
      });
    }

    // VALIDAR EDAD
    if (age < 25) {
      return res.status(400).json({
        success: false,
        message: 'La edad mínima permitida es 25 años'
      });
    }

    // VALIDAR SUELDO
    if (salary < 0) {
      return res.status(400).json({
        success: false,
        message: 'El sueldo no puede ser negativo'
      });
    }

    // REGISTRO SUPABASE
    const { data, error } = await supabase.auth.signUp({

      email,
      password,

      options: {

        data: {

          first_name,
          last_name,
          age,
          salary,
          children_count: children_count || 0,
          pets_count: pets_count || 0

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
      message: 'Usuario registrado correctamente',
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
      first_name,
      last_name,
      age,
      salary,
      children_count,
      pets_count
    } = req.body;

    // VALIDAR EDAD
    if (age && age < 25) {

      return res.status(400).json({
        success: false,
        message: 'La edad mínima permitida es 25 años'
      });

    }

    // VALIDAR SUELDO
    if (salary && salary < 0) {

      return res.status(400).json({
        success: false,
        message: 'El sueldo no puede ser negativo'
      });

    }

    // UPDATE
    const { data, error } = await supabase.auth.updateUser({

      data: {

        first_name,
        last_name,
        age,
        salary,
        children_count,
        pets_count

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

    // VALIDACIÓN
    if (!email) {

      return res.status(400).json({
        success: false,
        message: 'Email requerido'
      });

    }

    // RECOVERY
    const { error } = await supabase.auth.resetPasswordForEmail(

      email,

      {
        redirectTo: 'http://localhost:5173/update-password'
      }

    );

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

    // VALIDACIÓN
    if (!password) {

      return res.status(400).json({
        success: false,
        message: 'Nueva contraseña requerida'
      });

    }

    // UPDATE PASSWORD
    const { data, error } = await supabase.auth.updateUser({

      password

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