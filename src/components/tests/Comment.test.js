/* global expect*/

import Comment from './../Comment';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

let editComment = {
    id: '1',
    initText: 'Init',
    newText: '',
}

describe("Tests for rendering comment", () => {
    it('Got correct info', () => {
        const wrapper = mount(
            <Comment
                _id='1'
                number={1}
                user='test'
                time='2021-10-27'
                text='Test comment'
            />
        );

        expect(wrapper.text()).toContain('test');
        expect(wrapper.text()).toContain('2021-10-27');
    });

    it('Got correct buttons', () => {
        const wrapper = mount(
            <Comment
                _id='1'
                number={1}
                user='test'
                time='2021-10-27'
                text='Test comment'
            />
        );

        expect(wrapper.text()).toContain('delete');
        expect(wrapper.text()).toContain('edit');
        expect(wrapper.text()).not.toContain('clear');
        expect(wrapper.text()).not.toContain('done');
    });

    it('Got correct text', () => {
        const wrapper = mount(
            <Comment
                _id='1'
                number={1}
                user='test'
                time='2021-10-27'
                text='Test comment'
            />
        );

        expect(wrapper.text()).toContain('Test comment');
    });

    describe("Tests for rendering comment edit-mode", () => {
        it('Got correct buttons', () => {
            const wrapper = mount(
                <Comment
                    _id='1'
                    number={1}
                    user='test'
                    time='2021-10-27'
                    text='Test comment'
                    editComment={editComment}
                    editCommentChange= {() => {
                        console.log('test');
                    }}
                />
            );

            expect(wrapper.text()).not.toContain('delete');
            expect(wrapper.text()).not.toContain('edit');
            expect(wrapper.text()).toContain('clear');
            expect(wrapper.text()).toContain('done');
        });

        it('Got correct text init value', () => {
            const wrapper = mount(
                <Comment
                    _id='1'
                    number={1}
                    user='test'
                    time='2021-10-27'
                    text='Test comment'
                    editComment={editComment}
                    editCommentChange= {() => {
                        console.log('test');
                    }}
                />
            );

            let text = wrapper.find('textarea');

            expect(text.text()).toContain('Init');
        });

        it('Got correct text new value', () => {
            editComment.newText = 'New Text';

            const wrapper = mount(
                <Comment
                    _id='1'
                    number={1}
                    user='test'
                    time='2021-10-27'
                    text='Test comment'
                    editComment={editComment}
                    editCommentChange= {() => {
                        console.log('test');
                    }}
                />
            );

            let text = wrapper.find('textarea');

            expect(text.text()).toContain('New Text');
        });

        it('Got correct text editId does not equal comment id', () => {
            editComment.id = 'New Text';

            const wrapper = mount(
                <Comment
                    _id='1'
                    number={1}
                    user='test'
                    time='2021-10-27'
                    text='Test comment'
                    editComment={editComment}
                    editCommentChange= {() => {
                        console.log('test');
                    }}
                />
            );

            expect(wrapper.text()).toContain('Test comment');
        });
    });
})
