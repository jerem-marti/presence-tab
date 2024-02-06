import User from "./modules/User";

const main = document.querySelector(`main`);
const buttonSortAge = document.querySelector(`#sort--age`);
const buttonSortName = document.querySelector(`#sort--name`);

const getUsers = async () => {
    const rawUsers = await fetch(`https://randomuser.me/api/?results=20`);
    const jsonUsers = await rawUsers.json();
    console.log(jsonUsers.results);
    return jsonUsers.results.map(user => {  
        return { 
            name: {
                title: user.name.title,
                first: user.name.first,
                last: user.name.last
            },
            location: {
                city: user.location.city, 
                country: user.location.country 
            },
            age: user.dob.age, 
            email: user.email,
            picture: user.picture.large
        }
    });
}

const renderUsers = (users) => {
    users.forEach(user => {
        user.render(main);
    });
}

const sortByName = (users) => {
    return users.sort((user1, user2) => user1.details.name.last.localeCompare(user2.details.name.last));
}

const sortByAge = (users) => {
    return users.sort((user1, user2) => user1.details.age - user2.details.age);
}

const clearMain = () => {
    main.innerHTML=``;
}

getUsers().then(rawUsers => {
    let users = sortByName(rawUsers.map(user => new User(user)));
    
    renderUsers(users);

    buttonSortName.addEventListener(`click`, (e) => {
        e.currentTarget.classList.add(`selected`);
        buttonSortAge.classList.remove(`selected`);
        clearMain();
        renderUsers(sortByName(users));
    });

    buttonSortAge.addEventListener(`click`, (e) => {
        e.currentTarget.classList.add(`selected`);
        buttonSortName.classList.remove(`selected`);
        clearMain();
        console.log(sortByAge(users));
        renderUsers(sortByAge(users));
    });
});

const test = false;
console.log(test);