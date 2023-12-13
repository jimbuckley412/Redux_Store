import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { setUser, setLoading } from '../redux/actions';

function OrderHistory({ user, loading, setUser, setLoading }) {
  const { data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data, setUser]);

  useEffect(() => {
    setLoading(!data);
  }, [data, setLoading]);

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                {/* ... rest of your code ... */}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setLoading: (loading) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
