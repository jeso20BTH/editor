// /* global test*/
//
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
//
// import { render, screen } from '@testing-library/react';
// import App from './App';
// import { shallow, mount} from 'enzyme';
// import userEvent from '@testing-library/user-event'
//
//
//
// Enzyme.configure({ adapter: new Adapter() });
//
// jest.mock('./services/api-get');
//
// test('Got correct header', () => {
//     render(<App />);
//     const linkElement = screen.getByText(/Editor of the people/i);
//
//     expect(linkElement).toBeInTheDocument();
// });
//
// test('Got a placeholder title to start with', (done) => {
//     render(<App />);
//     const linkElement = screen.getByPlaceholderText(/Enter an name/);
//
//     expect(linkElement).toBeInTheDocument();
//
//     done();
// });
//
// // test('Open loads documents', (done) => {
// //     const wrapper = shallow(<App />);
// //
// //     wrapper.find('open').simulate('click');
// //
// //     setTimeout(() => {
// //         wrapper.update();
// //
// //         expect(wrapper.find(test')).toBeInTheDocument();
// //
// //         done();
// //     })
// });
