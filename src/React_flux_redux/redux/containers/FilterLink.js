import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.setVisibilityFilter
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
}

const FilterLink = connect(
  mapStateProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
