let userId = null; 

function getUserId() {    
    return userId;
}

function setUserId(newUserId) {
    userId = newUserId;
}

export { getUserId, setUserId };