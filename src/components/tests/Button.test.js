/* global expect*/

import Button from './../Button';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe("Tests for rendering button", () => {
    it('Got correct button name', () => {
        const wrapper = mount(
            <Button name='Test' icon='test'/>
        );

        expect(wrapper.text()).toContain('Test');
        expect(wrapper.text()).not.toContain('PDF');
    });
})
