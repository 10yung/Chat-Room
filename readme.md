# Node.js Chat Room - [Demo_Site](http://pacific-thicket-54736.herokuapp.com/)

###### Chat Room built by Node Express, Socket.io, Materialize and deploy on heroku.
------

## Description

This is a Chat Room web app built by Node.js. You can see current online user and chat with each other. And because HTTP is **stateless** so each request is seen to be a new one ( you can open new tab and create a new user ). Once you login as a new user, server side javascript will pick a random color and first two char as your ID. And once you leave a message, other people will see your ID in front of message.

## Main Features

* New user join message, User leave chat room message

* List all current users

* Generate Random Color to represent a user

## Learning Path

In this app, I've learned how to use [socket.io](http://socket.io/) and design full javascript stack app. Backend part I use [express](http://expressjs.com/) as a responser and [handlebar](http://handlebarsjs.com/) as template engine. And Backend part are in charge of User ID generate, broadcast message and data flow. Frontend on the other hand are used to generate HTML ( I also use frontend handlebarjs ) to separate HTML code and make my code more readable. And for layout and design, I use [sweetalert](http://t4t5.github.io/sweetalert/) and [Materialize](http://materializecss.com/) to make my app more comfortable to use.

## Summary

I've confronted some challenges about design whole app by javascript. Sometime it really mess me up and forget which part is for Frontend and which is for Backend. I think I need more experience about javascript design pattern.
