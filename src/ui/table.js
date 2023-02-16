export class Table {
    #schema //array of objects {columnName: <string>, fieldName: <string>}
    #tbodyElement
    constructor(parentId, tableName, schema) {
        const parentElement = document.getElementById(parentId);
        this.#schema = schema;
        if (!parentElement) {
            throw `wrong parentId ${parentId}`
        }
        this.#fillForm(parentElement, tableName, schema);       
        this.#tbodyElement = document.getElementById(tableName);
    }
    #fillForm(parentElement, tableName, schema) {
        parentElement.innerHTML = ` <h3 class="table-logo">${tableName} </h3>
        <table >
            <thead>
                <tr>
                    ${getHeader(schema)}                    
                </tr>
            </thead>
            <tbody id="${tableName}">
               
            </tbody>
        </table>`
        
    }
    clearTable() {
        this.#tbodyElement.innerHTML = "";
    }
    addRow(object) {
        this.#tbodyElement.innerHTML += getRow(object, this.#schema);
    }

}
function getHeader(schema) {
    return schema.map(obj => `<th>${obj.columnName}</th>`).join('');
}
function getRow(data, schema) {
    return `<tr> ${getTds(data, schema)} </tr>`
}
function getTds(data, schema) {
    return schema.map(obj => `<td>${data[obj.fieldName]}</td>`).join('')
}