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

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const getNoteBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getNoteBody.response).toEqual([]);
});


// test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
//   // Step 1: Post two unique notes
//   const notesToPost = [
//     { title: "TestNote1", content: "TestContent1" },
//     { title: "TestNote2", content: "TestContent2" },
//   ];

//   for (const note of notesToPost) {
//     const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(note),
//     });

//     expect(postNoteRes.status).toBe(200);
//   }

//   // Step 2: Call the getAllNotes endpoint
//   const getAllRes = await fetch(`${SERVER_URL}/getAllNotes`);
//   const getAllBody = await getAllRes.json();

//   expect(getAllRes.status).toBe(200);

//   // Debugging: Log the response body
//   console.log(getAllBody);

//   // Step 3: Validate the response based on its structure
//   // Assuming getAllBody is an object with a property that contains the notes array
//   // Replace 'notesArray' with the actual property name
//   let notesArray = getAllBody.notesArray; // adjust the property name as needed

//   // If the response is directly an array
//   if (Array.isArray(getAllBody)) {
//     notesArray = getAllBody;
//   }

//   // Check if the notesArray has exactly two notes
//   expect(notesArray).toBeDefined();
//   expect(Array.isArray(notesArray)).toBe(true);
//   expect(notesArray.length).toBe(2);
// });  


test("/deleteNote - Delete a note", async () => {
  // Add a note (reusing the /postNote test setup)
  const title = "NoteTitleTest";
  const content = "NoteContentTest";

  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  const addNoteBody = await addNoteRes.json();
  const noteId = addNoteBody.insertedId; 

  // Delete the added note
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const deleteNoteBody = await deleteNoteRes.json();


  // Verify the note is deleted
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});


test("/patchNote - Patch with content and title", async () => {
  const title = "New_NoteTitleTest";
  const content = "New_NoteTitleContent";

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
  const noteId = postNoteBody.insertedId;

  const updatedTitle = "UpdatedNoteTitleTest";
  const updatedContent = "UpdatedNoteContent";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: noteId,
      title: updatedTitle,
      content: updatedContent,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  const newNoteTitle = "NewNoteForPatchTest";
  const newNoteContent = "Content of the new note";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newNoteTitle,
      content: newNoteContent,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const NoteId = postNoteBody.insertedId; 

  // Patch the note with just the title
  const updatedTitle = "UpdatedNoteTitleOnlyTest";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${NoteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: NoteId,
      title: updatedTitle,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${NoteId} patched.`);

  // Optionally delete the note
  // Replace this with your actual delete endpoint and method
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${NoteId}`, {
    method: "DELETE"
  });

  expect(deleteNoteRes.status).toBe(200);
});

test("/patchNote - Patch with just content", async () => {
  const newNoteTitle = "NewNoteForContentPatchTest";
  const newNoteContent = "Original content of the new note";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newNoteTitle,
      content: newNoteContent,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const newNoteId = postNoteBody.insertedId;

  expect(postNoteRes.status).toBe(200);

  // Patch the note with just the content
  const updatedContent = "Updated content for the note";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${newNoteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: newNoteId,
      content: updatedContent,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${newNoteId} patched.`);

  // Delete the note
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${newNoteId}`, {
    method: "DELETE"
  });

  expect(deleteNoteRes.status).toBe(200);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Post a new note
  const newNoteTitle = "TestNoteForDeleteAll";
  const newNoteContent = "Test content for DeleteAll";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newNoteTitle,
      content: newNoteContent,
    }),
  });


  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  // Call the deleteAllNotes endpoint
  const deleteAllRes = await fetch(`http://localhost:4000/deleteNote/${noteId}`, {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json"
    },
  });

  const deleteNoteBody = await deleteAllRes.json();
  expect(deleteAllRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Post three new notes
  for (let i = 1; i <= 3; i++) {
    const newNoteTitle = `TestNoteForDeleteAll${i}`;
    const newNoteContent = `Test content for DeleteAll ${i}`;

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newNoteTitle,
        content: newNoteContent,
      }),
    });

    expect(postNoteRes.status).toBe(200);
  }

  // Call the deleteAllNotes endpoint
  const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  });

  expect(deleteAllRes.status).toBe(200);

  // Verify all notes are deleted
  // This assumes there's an endpoint to get all notes, like '/getAllNotes'
  const getAllRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const getAllBody = await getAllRes.json();

  expect(getAllRes.status).toBe(200);
  expect(getAllBody.response).toEqual([]);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Post a new note or use an existing one
  const newNoteTitle = "TestNoteForColorUpdate";
  const newNoteContent = "Content for color update test";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newNoteTitle,
      content: newNoteContent,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId; // Capture the note ID

  expect(postNoteRes.status).toBe(200);

  // Update the note color to red
  const colorUpdateRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: noteId,
      color: "#FF0000",
    }),
  });

  const updateColorBody = await colorUpdateRes.json();
  console.log(updateColorBody);

  expect(colorUpdateRes.status).toBe(200);
  expect(updateColorBody.message).toBe("Note color updated successfully.");
});