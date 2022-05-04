const EventEmitter = require('events');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const authenticate = require('./core/authenticate');
const meeting = require('./core/meeting');
const message = require('./core/message');
const member = require('./core/member');
const audio = require('./core/audio'); // Not working


class Meet extends EventEmitter {

    constructor() {
        super();
        console.log("Client created!")

        // Listeners (for use in login function)
        this.message = message;
        this.member = member;
        this.audio = audio;

        this.meetingLink = undefined;
        this.email = undefined

        this.puppeteer = puppeteer;
        this.browser = undefined;
        this.page = undefined;
        this.ctx = undefined;

        this.isMicEnabled = true;
        this.isVideoEnabled = true;
        this.isChatEnabled = undefined;

        this.recentMessage = undefined;
        this.members = undefined;
    };

    login = authenticate.auth;

    toggleMic = meeting.toggleMic;
    toggleVideo = meeting.toggleVideo;
    toggleChat = meeting.toggleChat;
    toggleMemberList = meeting.toggleMemberList;
    chatEnabled = meeting.chatEnabled;
    sendMessage = meeting.sendMessage;
    screenshot = meeting.screenshot;

}

module.exports.Meet = Meet;

/* Notes */

// Various XPaths and element class names or ids are not explained throughout this source; there's probably a better way to have a permanent selector to a specific element though

// The Audio part of this package has not yet been implemented

// This code can be improved in many ways, but I wrote this during the beginning of Covid lockdown; I've only now decided to add a license and create a repository to publish

// This package aims to be similar to the Discord JS library
