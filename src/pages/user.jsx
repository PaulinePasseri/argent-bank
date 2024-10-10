import Account from "../components/Account/account"

export default function User({name}) {
    return (
        <main class="main bg-dark">
            <div class="header">
                <h1>Welcome back<br />{name}</h1>
                <button class="edit-button">Edit Name</button>
            </div>
            <h2 class="sr-only">Accounts</h2>
            <Account />
            <Account />
            <Account />
        </main>
    )
}