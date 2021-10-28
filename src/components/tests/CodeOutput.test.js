/* global expect*/

import CodeOutput from './../CodeOutput';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

let codeRows = 'Hej\nTest\n'

describe("Tests for rendering code output", () => {
    it('Got correct header', () => {
        const wrapper = mount(
            <CodeOutput code={codeRows}/>
        );

        expect(wrapper.text()).toContain('Output:');
    });

    it('Got correct code rows', () => {
        const wrapper = mount(
            <CodeOutput code={codeRows}/>
        );

        expect(wrapper.text()).toContain('- Hej');
        expect(wrapper.text()).toContain('- Test');
    });

    it('Got correct button text', () => {
        const wrapper = mount(
            <CodeOutput code={codeRows}/>
        );

        expect(wrapper.text()).toContain('Clear');
    });

    it('Does not got all code not seperated', () => {
        const wrapper = mount(
            <CodeOutput code={codeRows}/>
        );

        expect(wrapper.text()).not.toContain('Hej\nTest');
    });
})
