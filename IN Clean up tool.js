(async function() {
    // Prompt for numbers
    var numbersString = prompt("Please paste the numbers separated by spaces:");
    if (!numbersString) {
        alert("No numbers provided. Exiting script.");
        return;
    }

    // Split the input by spaces to get individual numbers
    var numbers = numbersString.trim().split(/\s+/);

    // Prepend "64" to each number
    numbers = numbers.map(number => "64" + number);

    try {
        // Click the button to open the popup
        var openPopupButton = document.evaluate("/html/body/div[1]/div[4]/div/div/div[1]/div[1]/button[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (openPopupButton) {
            openPopupButton.click();
        } else {
            throw new Error("Open Popup Button not found.");
        }

        // Build the formatted string
        var formattedNumbers = numbers.join(" ");

        // Insert the formatted numbers into the popup input field
        var popupInputField = document.evaluate("/html/body/div[18]/div[3]/div[4]/div[2]/table/tbody/tr[2]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (popupInputField) {
            popupInputField.value = formattedNumbers;
        } else {
            throw new Error("Popup Input Field not found.");
        }

        // Click the button to close the popup
        var closePopupButton = document.evaluate("/html/body/div[1]/div[4]/div/div/div[1]/div[1]/button[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (closePopupButton) {
            closePopupButton.click();
        } else {
            throw new Error("Close Popup Button not found.");
        }

        // Main loop to paste numbers and execute
        for (var i = 0; i < numbers.length; i++) {
            // Paste number
            var inputField = document.evaluate("/html/body/div[1]/div[5]/div/div/div[2]/div[1]/form/div/div/input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (inputField) {
                inputField.value = numbers[i];
            } else {
                throw new Error("Input Field not found.");
            }

            // Click execute
            var executeButton = document.evaluate("//*[@id='dlg-execute-flow']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (executeButton) {
                executeButton.click();
            } else {
                throw new Error("Execute Button not found.");
            }

            // Wait for a bit (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, 9000));

            // Clear input field for the next number
            inputField.value = "";
        }
    } catch (error) {
        console.error("An error occurred: ", error.message);
    }
})();
