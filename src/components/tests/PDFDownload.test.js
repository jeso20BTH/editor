/* global expect*/

import PDFDownload from './../PDFDownload';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe("Tests for rendering PDF-download popup", () => {
    it('Got correct download text', () => {
        const wrapper = mount(
            <PDFDownload
                title='Test'
                href='http://localhost:666/download/test.pdf'
            />
        );

        expect(wrapper.find('span').text()).toContain('Do you wanna download the document');
        expect(wrapper.find('span').text()).toContain('Test.pdf');
    });

    it('Got correct href to download', () => {
        const wrapper = mount(
            <PDFDownload
                title='Test'
                href='http://localhost:666/download/test.pdf'
            />
        );

        expect(wrapper.find('a').props().href).toEqual('http://localhost:666/download/test.pdf');
    });

    it('Got correct download prop', () => {
        const wrapper = mount(
            <PDFDownload
                title='Test'
                href='http://localhost:666/download/test.pdf'
            />
        );

        expect(wrapper.find('a').props().download).toEqual('Test.pdf');
    });

    it('Got correct buttons', () => {
        const wrapper = mount(
            <PDFDownload
                title='Test'
                href='http://localhost:666/download/test.pdf'
            />
        );

        expect(wrapper.find('a').text()).toEqual('YES');
        expect(wrapper.find('button').text()).toEqual('NO');
    });
})
