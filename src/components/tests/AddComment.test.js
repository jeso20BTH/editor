/* global expect*/
import AddComment from './../AddComment';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe("Tests for rendering comment adding", () => {
    it('Got correct buttons', () => {
        const wrapper = mount(
            <AddComment />
        );

        expect(wrapper.text()).toContain('done');
        expect(wrapper.text()).toContain('clear');
    });
})
