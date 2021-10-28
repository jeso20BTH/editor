/* global expect*/

import CodeRow from './../CodeRow';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe("Tests for code row", () => {
    it('Got the correct text', () => {
        const wrapper = mount(
            <CodeRow codeRow='Test'/>
        );

        expect(wrapper.text()).toContain('- Test');
    });
})
