// Core meeting methods

async function toggleMic() {
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyD');
    await this.page.keyboard.up('ControlLeft');
    this.isMicEnabled = !this.isMicEnabled;
}

async function toggleVideo() {
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyE');
    await this.page.keyboard.up('ControlLeft');
    this.isVideoEnabled = !this.isVideoEnabled;
}

async function toggleChat() {
    var chatBtn = await this.page.waitForXPath('/html/body/div[1]/c-wiz/div[1]/div/div[9]/div[3]/div[10]/div[3]/div[3]/div/div/div[3]/span/button');
    await chatBtn.click();
}

async function toggleMemberList() {
    var memberListBtn = await this.page.waitForXPath('/html/body/div[1]/c-wiz/div[1]/div/div[9]/div[3]/div[10]/div[3]/div[3]/div/div/div[2]/span/button');
    await memberListBtn.click();
}

async function chatEnabled() {
    await this.page.waitForSelector('#bfTqV');
    var disabled = await this.page.evaluate(() => {disabled = document.querySelector('#bfTqV'); if (disabled.disabled === false) {return true;} else if (disabled.disabled === true) {return false;}});
    return disabled;
}

async function sendMessage(message) {
    if (await this.chatEnabled()) {
        var chat = await this.page.waitForSelector('#bfTqV'); await chat.focus();
        await this.page.$eval('#bfTqV', (input, message) => {input.value = message; console.log(input); console.log(message)}, message); // replaced `await page.keyboard.type(message)`, because this is a little more instant
        await this.page.keyboard.press('Enter');
    }
}

async function screenshot(path) {
    await this.page.screenshot({ path: path, fullPage: true });
}

module.exports = {
    toggleMic: toggleMic,
    toggleVideo: toggleVideo,
    toggleChat: toggleChat,
    toggleMemberList: toggleMemberList,
    chatEnabled: chatEnabled,
    sendMessage: sendMessage,
    screenshot: screenshot,

}
