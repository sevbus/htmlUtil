
/**
 * Creates an HTML element and sets class names and an id
 * @param tagName - String that specifies the type of the element (e.g. div)
 * @param classNames - Optional space seperated list or an array of class name to be set
 * @param id - Optional unique id
 * @returns HTMLElement
 */
export function htmlCreate(tagName:string, classNames?:string|string[], id?:string):HTMLElement {
    let e = document.createElement(tagName);

    if (classNames) {
        let listOfClassnames:string[] = [];
        if (Array.isArray(classNames)) {
            listOfClassnames = classNames;
        } else {
            listOfClassnames = classNames.split(' ');
        }

        for (let i = 0; i < listOfClassnames.length; ++i) {
            e.classList.add(listOfClassnames[i]);
        }
    }

    if (id) {
        e.id = id;
    }

    return e;
}

/**
 * Removes the first child of an element
 * @param element - The element from which the first child has to be removed
 * @returns True, if a child was removed, otherwise false
 */
export function htmlRemoveFirst(element:HTMLElement):boolean {
    if (element && element.hasChildNodes()) {
        element.removeChild(<Node>element.firstChild);
        return true;
    }

    return false;
}

/**
 * Removes the last child of an element
 * @param element - The element from which the last child has to be removed
 * @returns True, if a child was removed, otherwise false
 */
export function htmlRemoveLast(element:HTMLElement):boolean {
    if (element && element.hasChildNodes()) {
        element.removeChild(<Node>element.lastChild);
        return true;
    }

    return false;
}


/**
 * Removes all children from an element
 * @param element - The element from which the all children have to be removed
 * @returns True, if a at least one child was removed, otherwise false
 */
export function htmlRemoveAll(element:HTMLElement):boolean {
    if (element && element.hasChildNodes()) {
        while (element.hasChildNodes()) {
            element.removeChild(<Node>element.firstChild);
        }
        return true;
    }

    

    return false;
}

/**
 * Searches for an element based on an unique id
 * @param id - Id to search for
 * @returns The element if found, otherwise null
 */
export function htmlGetById(id:string):HTMLElement | null {
    return document.getElementById(id);
}

/**
 * Returns an array of elements that have a specific class name
 * @param className - The class name to search for
 * @param root - Optional root element. If set the search starts from root, otherwise 
 *               the entire DOM is used
 * @returns Array of found elements
 */
export function htmlGetByClassName(className:string, root?:HTMLElement):HTMLElement[] {
    let result: HTMLElement[] = [];
    if (root) {
        root.querySelectorAll('.' + className).forEach( (element:Element) => {
            result.push(<HTMLElement>element);
        });
    } else {
        let tmp = document.getElementsByClassName(className);
        for (let i = 0; i < tmp.length; ++i) {
            result.push(<HTMLElement>tmp[i]);
        }
    }

    return result;
}