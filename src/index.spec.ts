import {htmlCreate} from "./index";

describe( "Create HTML element", () => {
    beforeEach( () => {
        let fixture = '<div id="fixture"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    afterEach( () => {
        document.body.removeChild(<Node>document.getElementById('fixture'));
    });

    it ('should create an element', () => {
        let e = htmlCreate('div');
        expect(e).not.toBeNull();

        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(e);
        expect(fixture.children.length).toBe(1);
    });

    it ('should create an element a class', () => {
        let e = htmlCreate('div', 'testclass');
        expect(e).not.toBeNull();

        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(e);
        expect(fixture.children.length).toBe(1);
        expect(e.className).toBe('testclass');
    });

    it ('should create an element with multiple classes using space seperated list', () => {
        let e = htmlCreate('div', 'testclass1 testclass2 testclass3');
        expect(e).not.toBeNull();

        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(e);
        expect(fixture.children.length).toBe(1);
        expect(e.classList.length).toBe(3);
        expect(e.classList.contains('testclass1'));
        expect(e.classList.contains('testclass2'));
        expect(e.classList.contains('testclass3'));
    });

    it ('should create an element with multiple classes using an array', () => {
        let e = htmlCreate('div', ['testclass1', 'testclass2', 'testclass3']);
        expect(e).not.toBeNull();

        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(e);
        expect(fixture.children.length).toBe(1);
        expect(e.classList.length).toBe(3);
        expect(e.classList.contains('testclass1'));
        expect(e.classList.contains('testclass2'));
        expect(e.classList.contains('testclass3'));
    });

    it ('should create an element with an id', () => {
        let e = htmlCreate('div', null, 'testid');
        expect(e).not.toBeNull();

        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(e);
        expect(fixture.children.length).toBe(1);
        expect(document.getElementById('testid')).not.toBeNull;
        expect(e.id).toBe('testid');
    });
});

