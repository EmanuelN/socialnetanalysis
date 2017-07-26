var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

// List everyone and for each of them, list the names of who they follow and who follows them
var listFollowing = function (usr){
    var followingList = []
    for (i = 0; i < data[usr].follows.length; i++){
      followingList.push(data[data[usr].follows[i]].name)
    }
  return followingList
}

var listFollowedBy = function(usr){
  var followedList = []
  for (var key in data){
    for(i = 0; i < data[key].follows.length; i++)
      if (data[key].follows[i] === usr){
        followedList.push(data[key].name)
      }
  }
  return followedList
}

var listFollows = function(){
  output = {}
  for (var key in data){
    var name = data[key].name
    output[name] = {Follows: listFollowing(key), "Followed by": listFollowedBy(key) }
  }
  return output
}

console.log("List of everyone, who they follow and who follows them")
console.log(listFollows())
// Identify who follows the most people
var mostFollows = function(){
  mostFollows = 0
  whoHasMost = "Nobody"
  for (var key in data){
    if (data[key].follows.length > mostFollows){
      whoHasMost = data[key].name
      mostFollows = data[key].follows.length
    }
    else if (data[key].follows.length === mostFollows){
      whoHasMost += ("and " + data[key].name)
    }
  }
  return whoHasMost
}
console.log(mostFollows() + " follows the most people.")
// Identify who has the most followers
var mostFollowers = function(){
  amtFollowers = 0
  whoHasMost = "Nobody"
  for (var key in data){
    if (listFollowedBy(key).length > amtFollowers){
      whoHasMost = data[key].name
      amtFollowers = listFollowedBy(key).length
    }
    else if (listFollowedBy(key).length === amtFollowers && listFollowedBy(key).length != 0){
      whoHasMost += (" and " + data[key].name)
    }
  }
  return whoHasMost
}
console.log(mostFollowers() + " have the most followers.")
// Identify who has the most followers over 30
var oldFollowersList = function(usr){
  var followedList = []
  for (var key in data){
    for(i = 0; i < data[key].follows.length; i++)
      if (data[key].follows[i] === usr && data[key].age >= 30){
        followedList.push(data[key].name)
      }
  }
  return followedList
}
var mostOldFollowers = function(){
  amtFollowers = 0
  whoHasMost = "Nobody"
  for (var key in data){
    if (oldFollowersList(key).length > amtFollowers){
      whoHasMost = data[key].name
      amtFollowers = oldFollowersList(key).length
    }
    else if (oldFollowersList(key).length === amtFollowers && oldFollowersList(key).length != 0){
      whoHasMost += (" and " + data[key].name)
    }
  }
  return whoHasMost
}
console.log(mostOldFollowers() + " have the most followers over 30.")
// Identify who follows the most people over 30
var oldFollowsList = function(usr){
  var followingList = []
  for (i = 0; i < data[usr].follows.length; i++){
    if (data[data[usr].follows[i]].age >= 30){
      followingList.push(data[data[usr].follows[i]].name)
    }
  }
  return followingList
}
var mostOldFollows = function(){
  mostFollows = 0
  whoHasMost = "Nobody"
  for (var key in data){
    if (oldFollowsList(key).length > mostFollows){
      whoHasMost = data[key].name
      mostFollows = oldFollowsList(key).length
    }
    else if (oldFollowsList(key).length === mostFollows){
      whoHasMost += (" and " + data[key].name)
    }
  }
  return whoHasMost
}
console.log(mostOldFollows() + " follow the most people over 30.")
// List those who follow someone that doesn't follow them back
var lonelyFollowers = function (){
  var reFollowed=false;
  var lonely = []
  for (var key in data){
    for (i = 0; i < data[key].follows.length; i++){
      for (z in data[data[key].follows[i]].follows){
        if (key === data[data[key].follows[i]].follows[z]){
          reFollowed = true;
          break
        }
        reFollowed = false
      }
      if (reFollowed === false){
      lonely.push(data[key].name)
      break
      }
      if (reFollowed === true){
      }
    }
  }
  return lonely
}
console.log("List of those who follow some who don't follow back: ")
console.log(lonelyFollowers())
// List everyone and their reach (sum of # of followers and # of followers of followers)
var reach = function (){
  for (var key in data){
    var howManyFollowers = listFollowedBy(key)
    console.log("I am " + data[key].name + " and I have " + howManyFollowers.length + " followers")
    console.log("My followers have " + followersOfFollowers(key) + " followers")
    console.log("My reach is " + (Number(howManyFollowers.length) + Number(followersOfFollowers(key))))
  }
}
var followersOfFollowers = function(usr){
  var followersOf = 0
  followersOfFollowrs = listFollowedBy(usr).length
  for (var key in data){
    for(i = 0; i < data[key].follows.length; i++)
      if (data[key].follows[i] === usr){
        followersOf += followersOfFollowrs
      }
  }
  return followersOf
}
reach()