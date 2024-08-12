async function writeToPod(text, url) {
    let response;
    try {
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/turtle'
            },
            body: text
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

async function readFromPod(url) {
    let result;
    try {
        result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/turtle'
            }
        }
        );
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        return result.text();
    } catch (error) {
        console.error(error);
    }
}