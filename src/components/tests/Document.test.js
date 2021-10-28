/* global expect*/

import Document from './../Document';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

let table = <>
    <table>
        <tbody>
            <Document
                _id='1'
                name='Test'
                date='2021-10-27'
                type='code'
                userType='access'
            />
        </tbody>
    </table>
</>

let tableOwner = <>
    <table>
        <tbody>
            <Document
                _id='1'
                name='Test'
                date='2021-10-27'
                type='code'
                userType='owner'
            />
        </tbody>
    </table>
</>

describe("Tests for rendering document in menu", () => {
    it('Got correct name', () => {
        const wrapper = mount(table);

        let tds = wrapper.find('td');

        expect(tds.at(0).text()).toEqual('Test');
    });

    it('Got correct date', () => {
        const wrapper = mount(table);

        let tds = wrapper.find('td');

        expect(tds.at(1).text()).toEqual('2021-10-27');
    });

    it('Got correct type', () => {
        const wrapper = mount(table);

        let tds = wrapper.find('td');

        expect(tds.at(2).text()).toEqual('code');
    });

    it('Got no button for delete on an access document', () => {
        const wrapper = mount(table);

        let tds = wrapper.find('td');

        expect(tds.at(3).text()).toEqual('');
    });

    it('Got correct button for delete on an owned document', () => {
        const wrapper = mount(tableOwner);

        let tds = wrapper.find('td');

        expect(tds.at(3).find('i').text()).toEqual('clear');
    });
})
