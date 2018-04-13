import React from 'react';
import Toggle from 'react-toggle';
import {SORT_LIST_INCREASE,SORT_LIST_DECREASE} from '../../constants/actionTypes';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    productList : state.myreducer.productList
});

const mapDispatchToProps = dispatch => ({
    sortDataD: (productList) => dispatch({ type: SORT_LIST_DECREASE, productList }),
    sortData: (productList) => dispatch({ type: SORT_LIST_INCREASE, productList })
});


class MyTable extends React.Component {
  constructor(){
    super();
    this.sortDataD = data => this.props.sortDataD(this.props.productList);
    this.sortData = data => this.props.sortData(this.props.productList);
  }

  
  render(){
    if(this.props.productList == undefined){
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
              <button onClick={this.sortData}>Sort</button>
              <button onClick={this.sortDataD}>Sort2</button>
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
          {this.props.productList.map((product,i) =>
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
                  <Toggle defaultChecked={product.visible}  />
                </td>
              </tr>
        )}
        </tbody>
            </table>
          </div>
      );
  }
  
};

export default connect(mapStateToProps,mapDispatchToProps)(MyTable);
