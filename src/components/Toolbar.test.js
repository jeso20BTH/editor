/* global expect*/

import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

describe("Tests for rendering button", () => {
    it('Got correct button name', () => {
        let buttons = {
            misc: [
                {
                    icon: 'save',
                    name: 'Save'
                }
            ]
        }

        render(<Toolbar buttons={buttons}/>);
        const documentName = screen.getByText(/Save/);

        expect(documentName).toBeInTheDocument();
    });
})
