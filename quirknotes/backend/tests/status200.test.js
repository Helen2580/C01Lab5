const SERVER_URL = "http://localhost:4000";

test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('Notes API', () => {
    test('/getAllNotes - Return list of zero notes for getAllNotes', async () => {
        const response = await request(app).get('/getAllNotes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]); // Assuming the response is an array of notes
    });

    test('/getAllNotes - Return list of two notes for getAllNotes', async () => {
        // Add two notes to the database here

        const response = await request(app).get('/getAllNotes');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        // Clean up by removing the added notes
    });

    test('/deleteNote - Delete a note', async () => {
        // Add a note to delete

        const response = await request(app).delete('/deleteNote/{noteId}');
        expect(response.statusCode).toBe(200);
        // Check if the note is actually deleted
    });

    test('/patchNote - Patch with content and title', async () => {
        // Add a note to update

        const response = await request(app).patch('/patchNote/{noteId}')
            .send({ title: 'New Title', content: 'New Content' });
        expect(response.statusCode).toBe(200);
        // Verify the note's title and content are updated
    });

    test('/patchNote - Patch with just title', async () => {
        // Add a note to update

        const response = await request(app).patch('/patchNote/{noteId}')
            .send({ title: 'New Title' });
        expect(response.statusCode).toBe(200);
        // Verify the note's title is updated
    });

    test('/patchNote - Patch with just content', async () => {
        // Add a note to update

        const response = await request(app).patch('/patchNote/{noteId}')
            .send({ content: 'New Content' });
        expect(response.statusCode).toBe(200);
        // Verify the note's content is updated
    });

    test('/deleteAllNotes - Delete one note', async () => {
        // Add a note to delete

        const response = await request(app).delete('/deleteAllNotes');
        expect(response.statusCode).toBe(200);
        // Check if the note is actually deleted
    });

    test('/deleteAllNotes - Delete three notes', async () => {
        // Add three notes to delete

        const response = await request(app).delete('/deleteAllNotes');
        expect(response.statusCode).toBe(200);
        // Check if all three notes are actually deleted
    });

    test('/updateNoteColor - Update color of a note to red (#FF0000)', async () => {
        // Add a note to update

        const response = await request(app).patch('/updateNoteColor/{noteId}')
            .send({ color: '#FF0000' });
        expect(response.statusCode).toBe(200);
        // Verify the note's color is updated to red
    });
});
