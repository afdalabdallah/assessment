import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const TableRow = ({ data, index }) => {
  return (
    <tr id={data.id}>
      <td>{index + 1}</td>
      <td colSpan={4}>{data.title}</td>
      <td colSpan={4}>{data.summary}</td>
      <td colSpan={2}>
        {/* To add comas after each category except the last item in category */}
        {data.categories.map((cat, index) =>
          index == data.categories.length - 1 ? (
            <>{cat.name}. </>
          ) : (
            <>{cat.name}, </>
          )
        )}
      </td>
      <td colSpan={2}>{data.author.name}</td>
      <td>
        <Link to={`/details/${data.id}`} state={data}>
          <button className="btn btn-secondary">Details</button>
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
