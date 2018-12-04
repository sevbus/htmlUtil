import {
    htmlCreate, 
    htmlRemoveFirst, 
    htmlRemoveLast,
    htmlRemoveAll,
    htmlGetById,
    htmlGetByClassName} from "./index";

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

describe( 'Remove first element', () => {
    beforeEach( () => {
        let fixture = '<div id="fixture"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    afterEach( () => {
        document.body.removeChild(<Node>document.getElementById('fixture'));
    });
    
    it ( 'should return true', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(htmlCreate('div', 'testclass1'));
        fixture.appendChild(htmlCreate('div', 'testclass2'));

        expect(htmlRemoveFirst(fixture));
        expect(fixture.children.length).toBe(1);
        expect(fixture.children[0].className).toBe('testclass2');
    });

    it ( 'should return false', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        expect(htmlRemoveFirst(fixture)).toBeFalsy;
    });
});

describe( 'Remove last element', () => {
    beforeEach( () => {
        let fixture = '<div id="fixture"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    afterEach( () => {
        document.body.removeChild(<Node>document.getElementById('fixture'));
    });
    
    it ( 'should return true', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(htmlCreate('div', 'testclass1'));
        fixture.appendChild(htmlCreate('div', 'testclass2'));

        expect(htmlRemoveLast(fixture));
        expect(fixture.children.length).toBe(1);
        expect(fixture.children[0].className).toBe('testclass1');
    });

    it ( 'should return false', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        expect(htmlRemoveLast(fixture)).toBeFalsy;
    });
});

describe( 'Remove all elements', () => {
    beforeEach( () => {
        let fixture = '<div id="fixture"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    afterEach( () => {
        document.body.removeChild(<Node>document.getElementById('fixture'));
    });
    
    it ( 'should return true', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(htmlCreate('div', 'testclass1'));
        fixture.appendChild(htmlCreate('div', 'testclass2'));

        expect(htmlRemoveAll(fixture));
        expect(fixture.children.length).toBe(0);
    });

    it ( 'should return false', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        expect(htmlRemoveAll(fixture)).toBeFalsy;
    });
});

describe( 'htmlGetById', () => {
    beforeEach( () => {
        let fixture = '<div id="fixture"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    afterEach( () => {
        document.body.removeChild(<Node>document.getElementById('fixture'));
    });
    
    it ( 'should return an element', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(htmlCreate('div', 'testclass', 'testid'));
        
        let e = <HTMLElement>htmlGetById('testid'); 
        expect(e).not.toBeNull;
        expect(e.id).toBe('testid');
        expect(e.className).toBe('testclass');
    });

    it ( 'should return null', () => {
        let e = <HTMLElement>htmlGetById('testid'); 
        expect(e).toBeNull;
    });
});


describe( 'htmlGetByClassName', () => {
    beforeEach( () => {
        let fixture = '<div id="fixture"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    afterEach( () => {
        document.body.removeChild(<Node>document.getElementById('fixture'));
    });
    
    it ( 'should return one element', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(htmlCreate('div', 'testclass'));
        
        let e = htmlGetByClassName('testclass'); 
        expect(e.length).toBe(1);
        expect(e[0].className).toBe('testclass');
    });

    it ( 'should return two element', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.appendChild(htmlCreate('div', 'testclass'));

        let tmp = htmlCreate('div')
        tmp.appendChild(htmlCreate('div', 'testclass'));
        fixture.appendChild(tmp);
        
        let e = htmlGetByClassName('testclass'); 
        expect(e.length).toBe(2);
        expect(e[0].className).toBe('testclass');
        expect(e[1].className).toBe('testclass');
    });

    it ( 'should return empty array', () => {
        let e = htmlGetByClassName('testclass');
        expect(e.length).toBe(0);
    });

    it ( 'should return one element under the root', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.insertAdjacentHTML('afterbegin', '<div class="testclass"><div class="root"><div class="testclass"><div class="tmp"><div class="testclass"></div></div></div></div></div>');
        
        let root = htmlGetByClassName('tmp')[0];

        let e = htmlGetByClassName('testclass', root); 
        expect(e.length).toBe(1);
        expect(e[0].className).toBe('testclass');
    });

    it ( 'should return two element under the root', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.insertAdjacentHTML('afterbegin', '<div class="testclass"><div class="root"><div class="testclass"><div class="tmp"><div class="testclass"></div></div></div></div></div>');
        
        let root = htmlGetByClassName('root')[0];
        let e = htmlGetByClassName('testclass', root); 
        expect(e.length).toBe(2);
        expect(e[0].className).toBe('testclass');
        expect(e[1].className).toBe('testclass');
    });

    it ( 'should return empty array under the root', () => {
        let fixture = <HTMLElement>document.getElementById('fixture');
        fixture.insertAdjacentHTML('afterbegin', '<div class="testclass1"><div class="root"><div class="testclass1"><div class="tmp"><div class="testclass1"></div></div></div></div></div>');
        
        let e = htmlGetByClassName('testclass', fixture); 
        expect(e.length).toBe(0);
    });
});

