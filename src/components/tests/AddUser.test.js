/* global expect*/
import AddUser from './../AddUser';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe("Tests for rendering add user access", () => {
    it('Got correct buttons', () => {
        const wrapper = mount(
            <AddUser />
        );

        expect(wrapper.text()).toContain('done');
        expect(wrapper.text()).toContain('clear');
    });
})
