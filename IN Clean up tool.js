(async function() {
    // Prompt for numbers
    var numbersString = prompt("Please paste the numbers separated by spaces:");
    if (!numbersString) {
        alert("No numbers provided. Exiting script.");
        return;
    }

    // Split the input by spaces to get individual numbers
    var numbers = numbersString.split(" ");

    // Click the button to open the popup
    document.evaluate("/html/body/div[1]/div[4]/div/div/div[1]/div[1]/button[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    // Build the formatted string
    var formattedNumbers = numbers.join(" ");

    // Switch to the popup input field
    document.evaluate("/html/body/div[18]/div[3]/div[4]/div[2]/table/tbody/tr[2]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value = formattedNumbers;

    // Click the button to close the popup
    document.evaluate("/html/body/div[1]/div[4]/div/div/div[1]/div[1]/button[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    // Main loop to paste numbers and execute
    for (var i = 0; i < numbers.length; i++) {
        // Paste number
        var inputField = document.evaluate("/html/body/div[1]/div[5]/div/div/div[2]/div[1]/form/div/div/input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        inputField.value = numbers[i];

        // Click execute
        document.evaluate("//*[@id='dlg-execute-flow']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

        // Wait for a bit (adjust as needed)
        await new Promise(resolve => setTimeout(resolve, 6000));

        // Clear input field for the next number
        inputField.value = "";
    }
})();
