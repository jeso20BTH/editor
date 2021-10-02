/* global expect*/

import { render, screen } from '@testing-library/react';
import OpenMenu from './OpenMenu';

describe("Tests for rendering menu", () => {
    it('Got correct document name on a owned document', () => {
        let documents = {
            owner: [
                {
                    id: 'a',
                    name: 'Test',
                    date: '2021-09-15'
                }
            ],
            access: []
        }
        render(<OpenMenu status="documents" documents={documents}/>);
        const documentName = screen.getByText(/Test/i);

        expect(documentName).toBeInTheDocument();
    });

    it('Got correct document date on a owned document', () => {
        let documents = {
            owner: [
                {
                    id: 'a',
                    name: 'test',
                    date: '2021-09-15'
                }
            ],
            access: []
        }
        render(<OpenMenu status="documents" documents={documents}/>);
        const documentName = screen.getByText(/2021-09-15/i);

        expect(documentName).toBeInTheDocument();
    });
    it('Got correct document name on a access document', () => {
        let documents = {
            access: [
                {
                    id: 'a',
                    name: 'Test',
                    date: '2021-09-15'
                }
            ],
            owner: []
        }
        render(<OpenMenu status="documents" documents={documents}/>);
        const documentName = screen.getByText(/Test/i);

        expect(documentName).toBeInTheDocument();
    });

    it('Got correct document date on a access document', () => {
        let documents = {
            access: [
                {
                    id: 'a',
                    name: 'test',
                    date: '2021-09-15'
                }
            ],
            owner: []
        }
        render(<OpenMenu status="documents" documents={documents}/>);
        const documentName = screen.getByText(/2021-09-15/i);

        expect(documentName).toBeInTheDocument();
    });
})
