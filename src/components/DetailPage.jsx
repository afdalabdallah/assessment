import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HThree = styled.h3`
  color: green;
`;

function DetailPage() {
  const state = useLocation({});
  useEffect(() => {
    document.title = 'Details';
  }, []);
  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>
      <div className="container pt-5">
        <h1 className="text-center">Data Details</h1>
        <div className="w-75 mx-auto justify-content-center">
          <div>
            <HThree>Title</HThree>
            <p>{state.state.title}</p>
          </div>
          <div>
            <HThree>Summary</HThree>
            <p>{state.state.summary}</p>
          </div>
          <div>
            <HThree>Categories</HThree>
            <p>
              {/* To add comas after each category except the last item in category */}
              {state.state.categories.map((cat, index) =>
                index == state.state.categories.length - 1 ? (
                  <>{cat.name}. </>
                ) : (
                  <>{cat.name}, </>
                )
              )}
            </p>
          </div>
          <div className="mb-2">
            <HThree>Author</HThree>
            <div className="d-flex align-items-center">
              <img src={state.state.author.avatar} />

              <span>{state.state.author.name}</span>
            </div>
          </div>
          <div>
            <HThree>Published</HThree>
            <p>{state.state.publishDate.slice(0, 10)}</p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to="/">
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
