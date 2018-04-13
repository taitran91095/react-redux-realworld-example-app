import React from 'react';

const MyTable = props => {
  if(props.productList == undefined){
    return (
      <div>
        <table className="table">
        <tbody>
        <tr>
            <th>
              Product Name
            </th>
            <th>
              Price
            </th>
            <th>
              Qty
            </th>
            <th>
              Visible
            </th>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
  <div>
    <table className="table">
    <tbody>
    <tr>
        <th>
          Product Name
        </th>
        <th>
          Price
        </th>
        <th>
          Qty
        </th>
        <th>
          Visible
        </th>
      </tr>
      {props.productList.map((product,i) =>
          <tr key={i}>
            <td>
            {product.name}
            </td>
            <td>
             {product.price} 
            </td>
            <td>
              {product.qty}
            </td>
            <td>
              {product.visible.toString()}
            </td>
          </tr>
    )}
    </tbody>
        </table>
      </div>
  );
};

export default MyTable;
