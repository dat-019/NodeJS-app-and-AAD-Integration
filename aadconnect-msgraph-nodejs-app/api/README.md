## Development server - Prerequisites

- [Node.js](https://nodejs.org) installed on your development machine. If you do not have Node.js, visit the previous link for download options.
- For testing purpose, using your current DXC account credentials.

## Register a web application with the Azure Active Directory admin center

1. Open a browser and navigate to the [Azure Active Directory admin center](https://aad.portal.azure.com). Login using your DXC.

1. Select **Azure Active Directory** in the left-hand navigation, then select **App registrations** under **Manage**.

    ![A screenshot of the App registrations ](/images/aad-portal-app-registrations.png)

1. Select **New registration**. On the **Register an application** page, set the values as follows.

    - Set **Name** to `Node.js Graph Tutorial`.
    - Set **Supported account types** to **Accounts in any organizational directory and personal Microsoft accounts**.
    - Under **Redirect URI**, set the first drop-down to `Web` and set the value to `http://localhost:3000/auth/callback`.

    ![A screenshot of the Register an application page](/images/aad-register-an-app.png)

1. Choose **Register**. On the **Node.js Graph Tutorial** page, copy the value of the **Application (client) ID** and save it, you will need it in the next step.

    ![A screenshot of the application ID of the new app registration](/images/aad-application-id.png)

1. Select **Authentication** under **Manage**. Locate the **Implicit grant** section and enable **ID tokens**. Choose **Save**.

    ![A screenshot of the Implicit grant section](/images/aad-implicit-grant.png)

1. Select **Certificates & secrets** under **Manage**. Select the **New client secret** button. Enter a value in **Description** and select one of the options for **Expires** and choose **Add**.

    ![A screenshot of the Add a client secret dialog](/images/aad-new-client-secret.png)

1. Copy the client secret value before you leave this page. You will need it in the next step.

    > [!IMPORTANT]
    > This client secret is never shown again, so make sure you copy it now.

    ![A screenshot of the newly added client secret](/images/aad-copy-client-secret.png)

## Configure the sample

1. Edit the `.env` file and make the following changes.
    1. Replace `YOUR_APP_ID_HERE` with the **Application Id** you got from the App Registration Portal.
    1. Replace `YOUR_APP_PASSWORD_HERE` with the password you got from the App Registration Portal.
1. In your command-line interface (CLI), navigate to this directory and run the following command to install requirements.

    ```Shell
    npm install
    ```

## Run the sample

1. Run the following command in your CLI to start the application.

    ```Shell
    npm start
    ```

1. Open a browser and browse to `http://localhost:3000`.