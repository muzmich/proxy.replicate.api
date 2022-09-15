


    const data = { "incoming" : "well helloooo" };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/hello', options);
    const db_json = await db_response.json();
    console.log(db_json);
  });

