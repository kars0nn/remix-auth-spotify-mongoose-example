import { Link, useLoaderData } from "remix";
import { authenticator } from '../services/auth.server';

export const loader = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request);
    return { user };
};

export default function Index() {
    const data = useLoaderData();
    const user = data?.user;

    return (
        <>
            <div style={{ padding: "1.25rem" }}>
                <p>
                    {user ? (
                        <>
                            <img src={user?.avatar} width="100px" height="auto" style={{borderRadius:"5px"}} />
                            <p>You are logged in as:
                                <a href={user?.spotify_url}>{user?.username}</a></p>
                        </>
                    ) : (
                        <p>You are not logged in yet!</p>
                    )}
                </p>
                <br />
                <Link to="login">
                    Login Page
                </Link>
            </div>
        </>
    )
}