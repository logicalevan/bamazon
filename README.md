# bamazon

This is a node application that runs basic SQL commands on a database. 

## Instructions
In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this week. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.


1. Download the repo.
2. Open the files in command line and run ```npm i``` to install the node packages.
3. In order for app to run you need to setup a database. Run the schema file in a database app like Sequel Pro or MySQL Workbench.
4. To connect to your database you can either create a .env file with with your root password on it as shown below

```password=YOUR_PASSWORD_HERE```

   Or you can edit the password in the js files (line 18).
   
5. To run the app either enter

  ```node bamazonCustomer.js```
  
  or
  
  ```node bamazonManager.js```
  
6. The command line prompts will give you further instructions.

Make sure you use the normal GitHub. Because this is a CLI App, there will be no need to deploy it to Heroku. This time, though, you need to include screenshots, a gif, and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a `README.md` file.
