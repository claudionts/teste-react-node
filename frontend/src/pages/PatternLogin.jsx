import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import useForm from '../services/useForm';
import logo from '../assets/logo_180x.jpg';
import Validator from '../services/Validator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/auth';

import './../styles/form.css';

const PatternLogin = ({ auth, state, fetchUser, history }) => {

  useEffect(() => {
    if (state.auth.user && state.auth.token)
      history.push('/singin');
  }, [state]);

  const submitChange = async (values) => {
    await auth({...values})
  };
  
  const validate = (values) => {
    let errors = {};
    let validate = new Validator();
    validate.isEmail(values.email, 'Email não está certo!');
    validate.isRequired(values.password, 'Password está incorreto!');
    
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
		handleSubmit,
		handleChange,
	} = useForm(submitChange, validate);
  return (
    <div id="main-container">
      <form action="">
        <img src={logo} alt="" height="" width="175" />
        <h5>{JSON.stringify(state.auth)}</h5>
        <input 
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          id="email"
          value={values.email || ''}
          onChange={handleChange}
          />
        <input 
          placeholder="Password"
          value={values.password ||''}
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          />
        <Link to="/singin" >Cadastrar-se</Link>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => 
  bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PatternLogin);