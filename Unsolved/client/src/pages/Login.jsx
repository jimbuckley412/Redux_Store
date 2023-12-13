import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login({ loginUser, token }) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const newToken = mutationResponse.data.login.token;
      Auth.login(newToken);
      loginUser(newToken); // Dispatch action to update Redux state
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        {/* ... your form code ... */}
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (token) => dispatch(loginUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
