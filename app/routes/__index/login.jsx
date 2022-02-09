import { Form, Link } from "remix";

export default function Login() {
    return (
        <>
            <Link to="/">
                Back
            </Link>
            <br />
            <br />
            <Form action="/auth/spotify" method="post">
                <button>Login with Spotify</button>
            </Form>
            <br />
            <Form action="/logout" method="post">
                <button>Logout</button>
            </Form>
        </>

    );
}