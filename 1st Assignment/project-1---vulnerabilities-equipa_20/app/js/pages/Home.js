import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <h1> Welcome to our bookstore</h1> 
        <h3><p> This is a University of Aveiro project made by students 
                to better understand cybersecurity</p></h3>
            <p> Made by:</p>    
            <p> Gonçalo Maranhão</p>
            <p> Filipe Posio</p>
            <p> Pedro Carneiro</p>
            <p> Inês Águia</p>    
        `;
    }

    async validate() {
        return `
        <h1> This is the code from Home </h1>
        `;
    }
    async getJS() {
        return "";
    }

}