/* global test*/

import { render, screen } from '@testing-library/react';
import OpenMenu from './OpenMenu';

test('Got correct document name', () => {
    render(<OpenMenu status="documents" documents={[{id: 'a', name: 'test', date: '2021-09-15'}]}/>);
    const documentName = screen.getByText(/Test/i);

    expect(documentName).toBeInTheDocument();
});

test('Got correct document date', () => {
    render(<OpenMenu status="documents" documents={[{id: 'a', name: 'test', date: '2021-09-15'}]}/>);
    const documentName = screen.getByText(/2021-09-15/i);

    expect(documentName).toBeInTheDocument();
});
