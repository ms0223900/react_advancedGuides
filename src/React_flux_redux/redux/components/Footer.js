import React from 'react';
import  FilterLink  from '../containers/FilterLink';
import { VisibilityFilters } from '../actions'

const Footer = () => (
  <p>
    show: 
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>ALL</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Complete</FilterLink>
  </p>
)

export default Footer;