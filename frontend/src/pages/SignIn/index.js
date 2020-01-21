import React from 'react';
import useForm from '../../services/useForm';
import logo from '../../assets/logo_180x.jpg';
import './../../styles/form.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../redux/actions/auth';

const submitChange = (values) => console.log(values);

const validate = (values) => console.log(values);

const SingIn = (props) => {
  const {
		values,
		handleSubmit,
		handleChange,
	} = useForm(submitChange, validate);
  return (
    <div id="main-container">
      <form action="" onSubmit={handleSubmit}>
        <img src={logo} alt="" height="" width="175" />
        <input
          placeholder="Digite seu e-mail"
          value={values.email}
          onChange={handleChange}
        />
        <input
          placeholder="Digite seu e-mail"
          value={values.email}
          onChange={handleChange}
        />
        <input
          placeholder="Digite seu e-mail"
          value={values.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          value={values.email}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SingIn);