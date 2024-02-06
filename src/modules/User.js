
class User {
    static nbPresence = 0;
    #details;
    #isPresent;
    #html;

    constructor(user) {
        this.#details=user;
        this.#isPresent=false;
        this.#html=this.#generateHtml();
        this.#html.addEventListener(`click`, (e) => {
            this.#isPresent = !this.#isPresent;

            if(this.#isPresent)
                User.nbPresence++;
            else
                User.nbPresence--;
            document.querySelector(`.counter`).innerText = `${User.nbPresence}/20 people are here`;

            this.#html = this.#generateHtml();
            e.currentTarget.dataset.present = this.#isPresent;
        });
    }

    #generateHtml() {
        const div = document.createElement(`div`);
        div.classList.add(`user`);
        div.setAttribute(`data-present`,this.#isPresent);
        div.innerHTML = `
            <img src="${this.#details.picture}">
            <div class="user--info">
                    <h1>${this.#details.name.title} ${this.#details.name.first} ${this.#details.name.last}</h1>
                    <p>${this.#details.age} years old</p>
                    <p>${this.#details.location.city}, ${this.#details.location.country}</p>
            </div>
            <a href="mailto:${this.#details.emaily}">
                    <span class="mail">✉️</span>
            </a>
        `;
        return div;
    }

    render(nodeHtlm) {
        nodeHtlm.append(this.#html);
    }

    togglePresence(datasetPresence) {
        console.log(datasetPresence);
        this.#isPresent = !this.#isPresent;
        this.#html = this.#generateHtml();
        datasetPresence = this.#isPresent;
    }

    get isPresent () {
        return this.#isPresent;
    }

    get details () {
        return this.#details;
    }
}

export default User;