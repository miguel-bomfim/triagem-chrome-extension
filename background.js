// Get current user from mgraneis
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {

      // Check if the request is the login request
      if (details.method === "POST" && details.requestBody.formData) {  // Replace with the actual login URL
        // Decode the request body (FormData)
        const formData = details.requestBody.formData
        const username = formData.login_usuario[0];

        function formatUsername(user) {
          // Split the username into parts
          const parts = user.split('.');
        
          // Capitalize the first letter of each part and make the rest lowercase
          const formattedParts = parts.map(part => {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          });
        
          // Join the parts with a space
          return formattedParts.join(' ');
        }
  
        // Save the username to Chrome storage
        if (username) {
          chrome.storage.local.set({ username: formatUsername(username) }, function () {
            console.log("Username saved:", formatUsername(username));
          });
        }
      }
    },
    { urls: ["https://www.mgraneis.com.br/*"] },  // Replace with the actual website URL
    ["requestBody"]
  );
