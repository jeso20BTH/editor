/*global expect jest it describe*/

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';
import Toolbar from './components/Toolbar';
import { shallow, mount, configure } from 'enzyme';
import apiGet from './services/api-get';

configure({ adapter: new Adapter() });

describe('App.js testing', () => {
    it('Got correct header', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find('.header-title').text()).toContain('Editor of the people');
    });

    it('Title change on input', () => {
        const wrapper = mount((<App />));
        // console.log(wrapper.debug());

        let placeholder = wrapper.find('input').at(0);

        expect(placeholder.props().value).toEqual('');
        placeholder.simulate('change', { target: { value: 'a'} });
        placeholder.simulate('keydown', { keyCode: 65 });
        expect(wrapper.find('input').at(0).props().value).toEqual('a');
    });

    it('A click on login button shall take you to login page.', () => {
        const wrapper = mount((<App />));

        let button = wrapper.find('.link');
        // after waiting for all the promises to be exhausted
        // we can do our UI check
        let anchor = button.find('a');

        expect(anchor.props().href).toEqual('#/login');

        // expect(dataRow.find('td').at(0).text()).toEqual('test');
    });

    it('An unlogged in user should not be able to see an toolbar with open, new and save buttons.', () => {
        const wrapper = mount((<App />));

        expect(wrapper.contains(<Toolbar />)).toBe(false);
    });
});
