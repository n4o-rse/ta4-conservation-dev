async function writeToPod(text, url, type) {
    let response;
    try {
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': type
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

async function readFromPod(url, type) {
    let result;
    try {
        result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': type
            }
        }
        );
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        console.log(result);
        return result.text();
    } catch (error) {
        console.error(error);
    }
}