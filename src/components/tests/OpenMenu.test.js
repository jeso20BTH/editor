/* global expect*/
import OpenMenu from './../OpenMenu';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

let ownerDocs = {
    owner: [
        {
            id: 'a',
            name: 'Test',
            date: '2021-09-15',
            type: 'text',
            userType: 'owner'
        }
    ],
    access: []
};

let accessDocs = {
    access: [
        {
            _id: 1,
            documents: [{
                _id: 'a',
                name: 'Test',
                date: '2021-09-15',
                type: 'text',
                userType: 'access'
            }]
        }

    ],
    owner: []
}

describe("Tests for rendering menu", () => {
    it('Got correct document name on a owned document', () => {
        const wrapper = mount(
            <OpenMenu status="documents" documents={ownerDocs}/>
        );

        expect(wrapper.text()).toContain('Test');
    });

    it('Got correct document date on a owned document', () => {
        const wrapper = mount(
            <OpenMenu status="documents" documents={ownerDocs}/>
        );

        expect(wrapper.text()).toContain('2021-09-15');
    });

    it('Got correct document type on a owned document', () => {
        const wrapper = mount(
            <OpenMenu status="documents" documents={ownerDocs}/>
        );

        expect(wrapper.text()).toContain('text');
    });

    it('Got correct document name on a access document', () => {
        const wrapper = mount(
            <OpenMenu status="documents" documents={accessDocs}/>
        );

        expect(wrapper.text()).toContain('Test');
    });

    it('Got correct document date on a access document', () => {
        const wrapper = mount(
            <OpenMenu status="documents" documents={accessDocs}/>
        );

        expect(wrapper.text()).toContain('2021-09-15');
    });

    it('Got correct document type on a access document', () => {
        const wrapper = mount(
            <OpenMenu status="documents" documents={accessDocs}/>
        );

        expect(wrapper.text()).toContain('text');
    });
})
