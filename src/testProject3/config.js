import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import InputPad from './InputPad';
import AccoutingList from './AccoutingList';

configure({ adapter: new Adapter() });