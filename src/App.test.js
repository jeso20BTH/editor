/*global expect jest it describe*/

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';
import { shallow, mount, configure} from 'enzyme';
import apiGet from './services/api-get';

const runAllPromises = () => new Promise(setImmediate);

configure({ adapter: new Adapter() });

jest.mock('./services/api-get');

describe('App.js testing', () => {
    it('Got correct header', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find('.header-title').text()).toContain('Editor of the people');
    });

    it('Title change on input', () => {
        const wrapper = mount((<App />));
        // console.log(wrapper.debug());

        let placeholder = wrapper.find('input').at(0);

        expect(placeholder.props().value).toEqual('');
        placeholder.simulate('change', { target: { value: 'a'} });
        placeholder.simulate('keydown', { keyCode: 65 });
        expect(wrapper.find('input').at(0).props().value).toEqual('a');
    });

    it('A click on open button should loads documents', async () => {
        apiGet.mockResolvedValueOnce([
            {
                _id: '1',
                name: 'test',
                html: '<p>testtext</p>',
                date: '2021-09-16'
            }
        ]);
        const wrapper = mount((<App />));
        const preventDefault = jest.fn();

        wrapper.find('#open-btn').simulate('click', {preventDefault});

        await runAllPromises();
        // after waiting for all the promises to be exhausted
        // we can do our UI check
        wrapper.update();
        let dataRow = wrapper.find('tr').at(1);

        expect(wrapper.find('tr')).toHaveLength(2);

        expect(dataRow.find('td').at(0).text()).toEqual('test');
    });

    it('Open an document should change it´s document header', async () => {
        apiGet.mockResolvedValueOnce([
            {
                _id: '1',
                name: 'test',
                html: '<p>testtext</p>',
                date: '2021-09-16'
            }
        ]);
        const wrapper = mount((<App />));
        const preventDefault = jest.fn();

        wrapper.find('#open-btn').simulate('click', {preventDefault});

        await runAllPromises();
        // after waiting for all the promises to be exhausted
        // we can do our UI check
        wrapper.update();
        let dataRow = wrapper.find('tr').at(1);

        expect(wrapper.find('tr')).toHaveLength(2);

        expect(dataRow.find('td').at(0).text()).toEqual('test');

        dataRow.find('td').at(0).simulate('click');
        await runAllPromises();

        wrapper.update();

        let placeholder = wrapper.find('input').at(0).props().value;

        expect(placeholder).toEqual('test');
    });
});
