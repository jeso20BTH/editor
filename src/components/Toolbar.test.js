/* global test*/

import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

test('Got correct button name', () => {
    render(<Toolbar buttons={[{icon: 'save', name: 'Save'}]}/>);
    const documentName = screen.getByText(/Save/);

    expect(documentName).toBeInTheDocument();
});
