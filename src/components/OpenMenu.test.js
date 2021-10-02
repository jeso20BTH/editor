/* global expect*/

import { render, screen } from '@testing-library/react';
import OpenMenu from './OpenMenu';

describe("Tests for rendering menu", () => {
    it('Got correct document name', () => {
        render(<OpenMenu status="documents" documents={[{id: 'a', name: 'test', date: '2021-09-15'}]}/>);
        const documentName = screen.getByText(/Test/i);

        expect(documentName).toBeInTheDocument();
    });

    it('Got correct document date', () => {
        render(<OpenMenu status="documents" documents={[{id: 'a', name: 'test', date: '2021-09-15'}]}/>);
        const documentName = screen.getByText(/2021-09-15/i);

        expect(documentName).toBeInTheDocument();
    });
})
