import { h, createContext, render } from 'preact';
import { useContext, forwardRef } from 'preact/compat';
import { setup, styled } from '../index';
import { extractCss } from '../core/update';

describe('integrations', () => {
    it('preact', () => {
        const ThemeContext = createContext();
        const useTheme = () => useContext(ThemeContext);

        setup(h, forwardRef, useTheme);

        const target = document.createElement('div');

        const Span = styled('span')`
            color: red;
        `;

        const BoxWithColor = styled('div')`
            color: ${props => props.color};
        `;

        const BoxWithColorFn = styled('div')(
            props => `
            color: ${props.color};
        `
        );

        const BoxWithThemeColor = styled('div')`
            color: ${props => props.theme.color};
        `;

        const BoxWithThemeColorFn = styled('div')(
            props => `
            color: ${props.theme.color};
        `
        );

        const refSpy = jest.fn();

        render(
            <ThemeContext.Provider value={{ color: 'red' }}>
                <div>
                    <Span ref={refSpy} />
                    <BoxWithColor color={'red'} />
                    <BoxWithColorFn color={'red'} />
                    <BoxWithThemeColor />
                    <BoxWithThemeColorFn />
                    <BoxWithThemeColor theme={{ color: 'red' }} />
                    <BoxWithThemeColorFn theme={{ color: 'red' }} />
                </div>
            </ThemeContext.Provider>,
            target
        );

        expect(extractCss()).toMatchInlineSnapshot(`"' .go3707426746{color:red;}'`);
        expect(refSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                tagName: 'SPAN'
            })
        );
    });
});
