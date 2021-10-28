/* global expect*/

import Comments from './../Comments';
import Comment from './../Comment';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

let comments = [
    {
        _id: '1',
        number: 1,
        user: 'test',
        time: '2021-10-27',
        text: 'Test comment',
    }
]

describe("Tests for rendering comments div", () => {
    it('Got correct header', () => {
        const wrapper = mount(
            <Comments comments={comments}/>
        );

        expect(wrapper.find('h1').text()).toEqual('Comments');
    });

    it('Got correct info on comment', () => {
        const wrapper = mount(
            <Comments comments={comments}/>
        );

        let infoDiv = wrapper.find('.comment-info-div')

        expect(infoDiv.find('span').at(0).text()).toEqual('test');
        expect(infoDiv.find('span').at(1).text()).toEqual('2021-10-27');
    });

    it('Got correct buttons', () => {
        const wrapper = mount(
            <Comments comments={comments}/>
        );

        let infoDiv = wrapper.find('.comment-info-div')

        expect(infoDiv.find('i').at(0).text()).toEqual('delete');
        expect(infoDiv.find('i').at(1).text()).toEqual('edit');
    });

    it('Got correct text on comment', () => {
        const wrapper = mount(
            <Comments comments={comments}/>
        );

        let text = wrapper.find('.comment-text')

        expect(text.text()).toEqual('Test comment');
    });
})
