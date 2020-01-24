import React from 'react';
import useForm from '../services/useForm';
import logo from '../assets/logo_180x.jpg';
import userDefault from '../assets/user.png';
import { toastr } from 'react-redux-toastr';
import '../styles/form.css';
import Validator from '../services/Validator';

const SingIn = () => {

  const submitChange = (values) => {
    console.log(values);
  };

  const validate = (values) => {
    let errors = {};
    let validate = new Validator();
    validate.isEmail(values.email, 'Email não está certo!');
    validate.isRequired(values.password, 'Password está incorreto!');
    validate.isRequired(values.name, 'Nome é necessário!')

    if (!validate.isValid()) {
      errors.invalid = true;
      toastr.error('Erro!', validate.getError().message)
      return errors;
    } else {
      errors = {};
    }
    return errors;
  };


  const {
    values,
    handleImgChange,
		handleSubmit,
		handleChange,
  } = useForm(submitChange, validate);
  
  return (
    <div id="main-container">
      <form action="" onSubmit={handleSubmit}>
        <img src={logo} alt="" height="" width="175" />
        <div className="avatar-container">
          <div>
            <img
              id="imgUser"
              src={userDefault}
              alt="User"
              height="100" />
          </div>
          <label className="custom-file">
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              id="avatar"
              className="inputfile"
              onChange={handleImgChange} />
            Avatar
          </label>
        </div>
        <input
          placeholder="Digite seu e-mail"
          value={values.email || ''}
          name="email"
          id="email"
          type="email"
          onChange={handleChange}
        />
        <input
          placeholder="Digite seu nome"
          value={values.name || ''}
          name="name"
          id="name"
          type="text"
          onChange={handleChange}
        />
        <input
          placeholder="Digite sua senha"
          value={values.password || ''}
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit} >Login</button>
      </form>
    </div>
  );
}

export default SingIn;