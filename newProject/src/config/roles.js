const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers' , 'getLocations','manageLocations'],
 
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
console.log(roleRights);
module.exports = {
  roles,
  roleRights,
};
