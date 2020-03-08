import React from 'react';

const Table = ({headers, renderContent}) => {
  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            {headers.map((result,index)=>(
              <th key={index}>{result}</th>
            ))}
          </tr>
          {renderContent}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
