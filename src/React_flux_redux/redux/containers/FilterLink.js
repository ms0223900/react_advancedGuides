import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import React from 'react'
import { NavLink } from 'react-router-dom';
import Link from '../components/Link';

// const mapStateProps = (state, ownProps) => {
//   return {
//     active: ownProps.filter === state.setVisibilityFilter
//   };
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch(setVisibilityFilter(ownProps.filter));
//     },
//   };
// }

// const FilterLink = connect(
//   mapStateProps,
//   mapDispatchToProps
// )(Link);

const FilterLink = ({ filter, children }) => (
  <NavLink
    to={filter === 'SHOW_ALL' ? '/' : `/${filter}` }
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }} 
    >
      {children}
    </NavLink>
)

export default FilterLink;
