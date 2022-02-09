import type { ActionFunction, LoaderFunction } from 'remix'
import { redirect } from 'remix';

import { authenticator } from '../services/auth.server';

export const loader: LoaderFunction = () => redirect('/login');

export const action: ActionFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request);      // Check to see if the client has already logged in.
    if (!user) {                                                    // if not logged in, authenticate the user
        return await authenticator.authenticate('spotify', request);
    } else {                                                        // if is logged in, return to user page
        return redirect('/') // or to dashboard
    }
};