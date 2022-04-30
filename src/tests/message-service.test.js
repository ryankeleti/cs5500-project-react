import {
    createUser,
    deleteUsersByUsername,
    findUserByCredentials
} from "../services/users-service";

import {
    createMessage, deleteMessage, findAllMessages, findMessagesInSession,
    findAllMessagesSentByUser
} from "../services/messages-service"
import {createSession, deleteSession, findSessionsByUser} from "../services/message-session-service";

describe('can create message with REST API', () => {
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

    const sampleMessage = {
        message: "Test message",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

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
        await deleteMessage(newMessage._id);
        return deleteUsersByUsername(bob.username);
    })

    test('can insert new message with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newUser2 = await findUserByCredentials({username: bob.username, password: bob.password});
        const newSession = await findSessionsByUser(newUser1);
        newMessage = await createMessage(newUser1._id, newSession, sampleMessage);

        // verify inserted message's properties match parameter message
        expect(newMessage.message).toEqual(sampleMessage.message);
        expect(newMessage.sender.username).toEqual(sampleMessage.sender.username);
        expect(newMessage.timestamp).toEqual(sampleMessage.timestamp);
        expect(newMessage.session).toEqual(sampleMessage.session);

    });
});


describe('can delete message with REST API', () => {
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

    const sampleMessage = {
        message: "Test message",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

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

    test('can delete new message with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newSession = await findSessionsByUser(newUser1);
        newMessage = await createMessage(newUser1._id, newSession, sampleMessage);

        // delete a message by their message id. Assumes user already exists
        const status = await deleteMessage(newMessage._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve all messages by user with REST API', () => {
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

    const sampleMessage = {
        message: "Test message",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

    const sampleMessage1 = {
        message: "Test message 1",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

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
        newMessage = await createMessage(newUser1._id, newSession, sampleMessage);
        newMessage2 = await createMessage(newUser1._id, newSession, sampleMessage1);

        const messages = await findAllMessagesSentByUser(newUser1._id);
        expect(messages.count()).toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve all messages by session with REST API', () => {
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

    const sampleMessage = {
        message: "Test message",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

    const sampleMessage1 = {
        message: "Test message 1",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

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

    test('can retrieve all messages by Session with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newSession = await findSessionsByUser(newUser1);
        newMessage = await createMessage(newUser1._id, newSession, sampleMessage);
        newMessage2 = await createMessage(newUser1._id, newSession, sampleMessage1);

        const messages = await findMessagesInSession(newSession._id);
        expect(messages.count()).toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve all messages with REST API', () => {
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

    const sampleMessage = {
        message: "Test message",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

    const sampleMessage1 = {
        message: "Test message 1",
        sender: ripley,
        timestamp: "2021-12-25T05:00:00.000Z",
        session: sampleMessageSession
    };

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

    test('can retrieve all messages with REST API', async () => {
        // insert new user in the database

        const newUser1 = await findUserByCredentials({username: ripley.username, password: ripley.password});
        const newSession = await findSessionsByUser(newUser1);
        newMessage = await createMessage(newUser1._id, newSession, sampleMessage);
        newMessage2 = await createMessage(newUser1._id, newSession, sampleMessage1);

        const messages = await findAllMessages();
        expect(messages.count()).toBeGreaterThanOrEqual(1);
    });
});