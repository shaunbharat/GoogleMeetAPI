// Member Listener

async function memberJoinListener(Meet) {

    while (true) {
        await Meet.page.waitForSelector('.iLNCXe', { visible: true, timeout: 0 }); // wait for member to join
        var member = await Meet.page.evaluate(() => { return document.querySelector('.iLNCXe').innerText.replace(' has joined', ''); });
        await Meet.emit('memberJoin', Meet.members[member]);
        await Meet.page.waitForSelector('.iLNCXe', { hidden: true, timeout: 0 });
    }

}

async function memberLeaveListener(Meet) {

    while (true) {
        members = Meet.members; // memberLeaveListener keeps own copy of member list (because when a member leaves, the list gets updated and memberLeaveListener doesn't get the member's info)
        await Meet.page.waitForSelector('.aGJE1b', { visible: true, timeout: 0 }); // wait for member to leave
        var member = await Meet.page.evaluate(() => {
            member = document.querySelector('.aGJE1b');
            if (member.innerText.endsWith(' has left the meeting')) {
                return member.innerText.replace(' has left the meeting', '');
            } else {
                return null;
            }
        })
        if (member === null) {continue;}
        await Meet.emit('memberLeave', members[member]);
        await Meet.page.waitForSelector('.aGJE1b', { hidden: true, timeout: 0 });
    }

}

async function memberListener(Meet) {

    async function getMembers() {
        var members = await Meet.page.evaluate(() => {
            members = {};
            member_list = document.querySelector('div[role="list"]');
            for (var i = 0; i < member_list.children.length; i++) {
                member = {
                    name: member_list.children[i].firstChild.lastChild.firstChild.firstChild.innerText,
                    icon: member_list.children[i].firstChild.firstChild.firstChild.src
                }
                members[member.name] = member;
            }
            return members;
        })
        Meet.members = members;
    }
    await getMembers();

    memberJoinListener(Meet);
    memberLeaveListener(Meet);

    await Meet.page.exposeFunction('getMembers', getMembers);

    await Meet.page.evaluate(() => {
        memberObserver = new MutationObserver(() => {getMembers();});
        memberObserver.observe(document.querySelector('div[role="list"]'), { subtree: true, childList: true });
    })

}

module.exports = {
    memberListener: memberListener
}
