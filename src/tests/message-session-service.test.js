import {
    createUser,
    deleteUsersByUsername,
    findUserByCredentials
} from "../services/users-service";

import {
    createSession, deleteSession, findSessionsByUser,
    findAllSessions, findSessionById
} from "../services/message-session-service";

describe('can create message session with REST API', () => {
    // var newMessage to have it accessed globally
    var newMessage;
    var newSession;

    // sample users to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const bob = {
        username: 'bob',
        password: 'bob123',
        email: 'bob@gmail.com'
    };

    const sampleMessageSession = {
        members: [ripley, bob]
    }

    // setup test before running test
    beforeAll(() => {
        // create user
        createUser(bob);
        return createUser(ripley);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteSession(newSession._id);
        await deleteUsersByUsername(ripley.username);
        return deleteUsersByUsername(bob.username);
    })

    test('can insert new message with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newUser2 = await findUserByCredentials({username: bob.username, password: bob.password});
        newSession = await createSession(sampleMessageSession);

        // verify inserted message session properties match parameter message session
        expect(newSession.members).toEqual(sampleMessageSession.members);
    });
});

describe('can delete message session with REST API', () => {
    // var newMessage to have it accessed globally
    var newMessage;
    var newSession;

    // sample users to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const bob = {
        username: 'bob',
        password: 'bob123',
        email: 'bob@gmail.com'
    };

    const sampleMessageSession = {
        members: [ripley, bob]
    }

    // setup test before running test
    beforeAll(() => {
        // create user
        createUser(bob);
        createSession(sampleMessageSession);
        return createUser(ripley);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteUsersByUsername(ripley.username);
        return deleteUsersByUsername(bob.username);
    })

    test('can delete new message with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newSession = await findSessionsByUser(newUser1);

        // delete a message session by their message session id. Assumes user already exists
        const status = await deleteSession(newSession._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve all message sessions by user with REST API', () => {
    // var newMessage to have it accessed globally
    var newMessage;
    var newMessage2;
    var newSession;

    // sample users to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const bob = {
        username: 'bob',
        password: 'bob123',
        email: 'bob@gmail.com'
    };

    const sampleMessageSession = {
        members: [ripley, bob]
    }

    // setup test before running test
    beforeAll(() => {
        // create user
        createUser(bob);
        createSession(sampleMessageSession);
        return createUser(ripley);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteSession(newSession._id);
        await deleteUsersByUsername(ripley.username);
        return deleteUsersByUsername(bob.username);
    })

    test('can retrieve all messages by User with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newSession = await findSessionsByUser(newUser1);
        expect(newSession.count()).toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve all message sessions by session id with REST API', () => {
    // var newMessage to have it accessed globally
    var newMessage;
    var newMessage2;
    var newSession;

    // sample users to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const bob = {
        username: 'bob',
        password: 'bob123',
        email: 'bob@gmail.com'
    };

    const sampleMessageSession = {
        members: [ripley, bob]
    }

    // setup test before running test
    beforeAll(() => {
        // create user
        createUser(bob);
        return createUser(ripley);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteSession(newSession._id);
        await deleteUsersByUsername(ripley.username);
        return deleteUsersByUsername(bob.username);
    })

    test('can retrieve all messages by Session with REST API', async () => {

        const tempSesison = await createSession(sampleMessageSession);
        newSession = await findSessionById(tempSesison._id);
        expect(newSession.count()).toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve all message sessions with REST API', () => {
    // var newMessage to have it accessed globally
    var newMessage;
    var newMessage2;
    var newSession;

    // sample users to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const bob = {
        username: 'bob',
        password: 'bob123',
        email: 'bob@gmail.com'
    };

    const sampleMessageSession = {
        members: [ripley, bob]
    }

    // setup test before running test
    beforeAll(() => {
        // create user
        createUser(bob);
        return createUser(ripley);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteSession(newSession._id);
        await deleteUsersByUsername(ripley.username);
        return deleteUsersByUsername(bob.username);
    })

    test('can retrieve all messages with REST API', async () => {
        // insert new user in the database
        const tempSession = await createSession(sampleMessageSession);
        const newSession = await findAllSessions();
        expect(newSession.count()).toBeGreaterThanOrEqual(1);
    });
});