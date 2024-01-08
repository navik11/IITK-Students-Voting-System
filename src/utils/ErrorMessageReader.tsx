function readErrorMessage(error: any) {

    if (!error.response)
        return error.message;
    else {
        const regex = /<pre>(.*?)<br>/;
        const match = String(error.response.data).match(regex);

        if (match) {
            const msg = match[1];
            return msg.replace("Error: ", "");
        } else {
            return ("Something went wrong :(");
        }
    }
}

export { readErrorMessage }