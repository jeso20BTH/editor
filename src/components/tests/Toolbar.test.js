/* global expect*/

import Toolbar from './../Toolbar';
import AddUser from './../AddUser';
import AddComment from './../AddComment';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

let buttons = {
    misc: [
        {
            icon: 'save',
            name: 'Save'
        }
    ],
    access: [
        {
            icon: 'save',
            name: 'PDF'
        }
    ]
}

describe("Tests for rendering button", () => {
    it('Got correct button name, standard button', () => {
        const wrapper = mount(
            <Toolbar buttons={buttons}/>
        );

        expect(wrapper.text()).toContain('Save');
        expect(wrapper.text()).not.toContain('PDF');
    });

    it('Got correct button name, document specific button', () => {
        const wrapper = mount(
            <Toolbar
                buttons={buttons}
                documentId='a'
                addAccessStatus={false}
                addCommentStatus={false}
            />
        );

        expect(wrapper.text()).toContain('PDF');
    });

    it('Loads AddAccess component', () => {
        const wrapper = mount(
            <Toolbar
                buttons={buttons}
                documentId='a'
                addAccessStatus={true}
                addCommentStatus={false}
            />
        );

        expect(wrapper.text()).not.toContain('PDF');
        expect(wrapper.contains(<AddUser />)).toBe(true);
    });

    it('Loads AddComment component', () => {
        const wrapper = mount(
            <Toolbar
                buttons={buttons}
                documentId='a'
                addAccessStatus={false}
                addCommentStatus={true}
            />
        );

        expect(wrapper.text()).not.toContain('PDF');
        expect(wrapper.contains(<AddComment />)).toBe(true);
    });
})
