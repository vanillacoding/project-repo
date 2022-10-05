# moji_moji

## Introduction

![moji_moji-demo](./moji_moji.gif)
[YouTube Demo](https://youtu.be/mf2h2QoYAjU)

**moji_moji** is a game that finds emoji in real life. To do this, analyze the video stream using **tensorflow.js**. It also allows you to broadcast gameplay in real time. It utilizes the **WebRTC** technology which enables to broadcast to more than 10 users and enables stream connection between peer to peer.


## Requirements

* You need a Chrome browser to take full advantage of it.
* You need a device with a camera to play games.
* You need the latest Chrome browser in the environment, not the mobile device for broadcasting.

## Installation

From your project directory, run the following:

1. Development Environment
```sh
$ npm install
# client and server
$ npm run dev
# visit http://localhost:8080
```

2. Production Environment
```sh
$ npm install
# make client
$ npm run build
# run server
$ npm start
```

For local environment, you have to make 'openssl' (visit here 'https://www.ibm.com/support/knowledgecenter/SSMNED_5.0.0/com.ibm.apic.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html')

## Features

* Image to emoji discrimination
* Game logic progress
* Sound according to game progress
* Broadcast using peer-to-peer connection
* Reconnect logic when a relay-peer is disconnected

## Client-Side

* Using modern Javascript with babel
* Implement component-based UI architecture using React, Webpack, CSS Modules
* Image to emoji classification analysis using tensorflow.js
* Using webrtc technology for screen-sharing and peer to peer connection
* Using socket.io for real-time connection between peer to peer

## Server-Side

* Server-side platform based on JavaScript engine (V8 engine) Node.js
* Using es5+ Javascript with babel
* Using express, simple and flexible Node.js web application framework
* Using socket.io as signaling server for webrtc connection

## Test

* Using Jest for testing javascript code
* Using Enzyme for testing React component

## Continuous Integration

* Using CircleCI for continuous integration of source management / build / test / deployment

## Deployment

### Client
* Domain connection using amazon route53
* Manage SSL using Amazon ACM(AWS Certificate Manager)

### Server
* Using Elastic Beanstalk for deploying and managing applications
* Using load-balancers for connection between https-client and http-server

## Version Control

* Use github repository for version control
* Branch, merge-based development progress

## Collaboration Tool

* Using Slack for team member communication
* Using Trello for schedule management and task allocation

## Challenges

1. With React, the various views and game logic (image analysis, progression of the game, etc.) were difficult to separate, which made it difficult to separate the components. For the normal operation of the app, only the result after the logic is driven from the top-level component is propagated to the sub-component for the normal operation of the app. Events generated from the sub-component are processed through the callback of the prop. In addition, the code that is not related to the view is separated into separate function functions.

2. In the process of making it possible for a large number of users to watch a broadcast, there was a problem that the number of connections to which a broadcasting user can deliver a stream is limited. In addition, when a large number of viewers are connected, there is a problem that the game of the user broadcasting is not smooth. To solve this problem, I changed the connection between users from a centralized structure to a linked list structure. Even if a large number of users watch a broadcast by connecting each peer to a relay, the game progress of the user transmitting the broadcast is smoothly performed. If the user connected to the relay leaves in the middle, the connection between the user who departed is adjusted So that broadcasting can continue.

3. The https protocol has become a necessity to use camera stream information. Because of this, the server side also needed to be able to receive the https protocol. In addition, SSL certificates were required to use https. To solve this problem, AWS route53 was used as a DNS, and SSL certificate was issued using AWS Certificate Manager (ACM). When route53 connects to the domain with https, the load balancer connects it to the node server with the http protocol. This allows the node server to connect without the need for a separate certificate via the http protocol.

## Things to do

* Add integration test and end-to-end test
* Responding to Possible Error Situations (Concurrent connections rather than sequential connections when broadcast)
* Code refactoring(Improving state management and code reusability)
* BugFix
* Improving mobile support(Improving recognition rate and Adding mobile broadcasting)
* IOS support.
* Improving Reactive design

## Sincere Thanks
[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
