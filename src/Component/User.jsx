import React, { useEffect, useReducer, useRef, useState } from 'react';

function useFetch(url, options) {
  const cache = useRef({});
  
  //Stop state update when component unmount
  const prevStateUpdate = useRef(false);

  const initialState = {
    error: undefined,
    data: undefined,
    loading: false,
  };

  const userReducer = (state, action) => {
    if (action.type === "loading") {
      return {...initialState, loading: true};
    } else if (action.type === "error") {
      return {...initialState, error: action.payload, loading: false};
    } else if (action.type === "data") {
      return {...initialState, data: action.payload, loading: false};
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // If there is no url, break out of the function
    if (!url) return;

    prevStateUpdate.current = false;

    const fetchUsers = async () => {
      dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: 'data', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        cache.current[url] = data;
        if (prevStateUpdate.current) return;

        dispatch({ type: 'data', payload: data });
      } catch (error) {
        if (prevStateUpdate.current) return;

        dispatch({ type: 'error', payload: error });
      }
    };

    fetchUsers();

    // Cleanup function
    return () => {
      prevStateUpdate.current = true;
    };
  }, [url, options]);
  return state;
};

export default function Users() {
  const [page, setPage] = useState(1);
  const {loading, error, data} = useFetch(
    'https://randomuser.me/api/?results=50&seed=abc'
  );

  const PER_PAGE = 10;
  const total = data?.results?.length;
  const pages = Math.ceil(total/PER_PAGE);
  const skip = page * PER_PAGE - PER_PAGE;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <h1>Users API</h1>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAMES</th>
            <th>GENDER</th>
            <th>CONTACT</th>
            <th>EMAIL</th>
            </tr>
        </thead>
      <tbody>
      {data?.results.slice(skip, skip + PER_PAGE)
      .map((each, index) => {
        const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
        const gender = `${each.gender}`;
        const cell = `${each.cell}`;
        const email = `${each.email}`;
        return (
          <tr key={name.toLowerCase().replaceAll(' ', '')}>
              <td >{index + 1}</td>
              <td>{name}</td>
              <td>{gender}</td>
              <td>{cell}</td>
              <td>{email}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
    <div className='button-nav'>
        {
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            prev
          </button>
        }
        {Array.from({ length: pages }, (value, index) => index + 1).map(
          (each, index) => (
            <button key={index} onClick={() => setPage(each)}>{each}</button>
          )
        )}
        {
          <button
            disabled={page >= pages}
            aria-disabled={page >= pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            next
          </button>
        }
      </div>

      <p className="pagination">
        Pages: {page} of {pages}
      </p>
    </div>
  );
}